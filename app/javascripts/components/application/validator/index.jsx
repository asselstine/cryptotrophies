import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import retrieveValidator from '../../../services/retrieve-validator'
import { NewDepositForm } from './new-deposit-form'
import { Link } from 'react-router-dom'
import { Modal } from '../../modal'
import { Address } from '../../address'
import { Ether } from '../../ether'
import { Loading } from '../../loading'
import { EventRow } from './event-row'
import validatorDeposit from '../../../services/validator-deposit'
import validatorWithdrawal from '../../../services/validator-withdrawal'

import update from 'immutability-helper'
import polystakeContract from '../../../contracts/polystake-contract'

export const Validator = connect(
  (state, ownProps) => {
    return {
      validator: _.get(state, `validators.validators[${ownProps.match.params.index}]`)
    }
  }
)(class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDeposit: false,
      showWithdraw: false,
      deposit: 0,
      events: []
    }
    this.onDeposit = this.onDeposit.bind(this)
    this.onWithdraw = this.onWithdraw.bind(this)
  }

  sortEvents (events) {
    events.sort((a, b) => {
      if (a.blockNumber > b.blockNumber) {
        return -1;
      } else if (a.blockNumber == b.blockNumber) {
        return 0;
      } else {
        return 1;
      }
    })
  }

  componentDidMount () {
    retrieveValidator(this.props.match.params.index)
    polystakeContract().deployed().then(instance => {
      var eventFilters = {
        owner: web3.eth.accounts[0],
        validatorIndex: this.props.match.params.index
      }
      var additionalFilters = {
        fromBlock: 0,
        toBlock: 'latest'
      }
      this.deposited = instance.Deposited(eventFilters, additionalFilters)
      this.deposited.watch((error, result) => {
        if (error) {
          console.error(error)
        } else {
          var events = update(this.state.events, { $push: [result] })
          this.sortEvents(events)
          this.setState({events: events})
        }
      })
      this.withdrawn = instance.Withdrawn(eventFilters, additionalFilters)
      this.withdrawn.watch((error, result) => {
        if (error) {
          console.error(error)
        } else {
          var events = update(this.state.events, { $push: [result] })
          this.sortEvents(events)
          this.setState({events: events})
        }
      })
    })
  }

  componentWillUnmount () {
    this.deposited.stopWatching()
    this.withdrawn.stopWatching()
  }

  onDeposit () {
    this.setState({
      showDeposit: true,
      deposit: 0,
    })
  }

  onWithdraw () {
    this.setState({
      showWithdraw: true,
    })
  }

  onSubmitDeposit (e) {
    e.preventDefault()
    validatorDeposit(this.props.match.params.index, this.state.deposit).then((result) => {
      retrieveValidator(this.props.match.params.index)
      this.setState({showDeposit: false})
    })
  }

  onSubmitWithdrawal () {
    validatorWithdrawal(this.props.match.params.index).then((result) => {
      retrieveValidator(this.props.match.params.index)
      this.setState({showWithdraw: false})
    })
  }

  render () {
    if (this.props.validator) {
      var validatorLabel = <Address address={this.props.validator.validatorAddress} />
      var content =
        <div>
          <h1 className='title'>Validator</h1>

          <Modal isOpen={this.state.showDeposit} onClose={(e) => this.setState({ showDeposit: false })}>
            <div className='box'>
              <h1 className='title'>New Validator Deposit</h1>
              <h2 className='subtitle'><Address address={this.props.validator.validatorAddress} /></h2>
              <NewDepositForm
                onSubmit={this.onSubmitDeposit.bind(this)}
                deposit={this.state.deposit}
                onChangeDeposit={(e) => this.setState({ deposit: e.target.value })} />
            </div>
          </Modal>
          <Modal isOpen={this.state.showWithdraw} onClose={(e) => this.setState({ showWithdraw: false })}>
            <div className='box'>
              <h1 className='title'>New Validator Withdrawal</h1>
              <h2 className='subtitle'><Address address={this.props.validator.validatorAddress} /></h2>
              <button className='button is-success' onClick={this.onSubmitWithdrawal.bind(this)}>Withdraw</button>
            </div>
          </Modal>

          <nav className='level'>
            <div className='level-item has-text-centered'>
              <div>
                <p className='heading'>Validator Address</p>
                <p className='title'><Address address={_.get(this.props, 'validator.validatorAddress')} toggleFull={false} /></p>
              </div>
            </div>

            <div className='level-item has-text-centered'>
              <div>
                <p className='heading'>Withdrawal Address</p>
                <p className='title'><Address address={_.get(this.props, 'validator.withdrawalAddress')} toggleFull={false} /></p>
              </div>
            </div>

            <div className='level-item has-text-centered'>
              <div>
                <p className='heading'>Deposit</p>
                <p className='title'><Ether wei={(_.get(this.props, 'validator.deposit') || 0)} /></p>
              </div>
            </div>

            <div className='level-item has-text-centered'>
              <div>
                <p className='heading'>Total Staked</p>
                <p className='title'><Ether wei={_.get(this.props, 'validator.totalDeposits') || 0} /></p>
              </div>
            </div>
          </nav>

          <a href='javascript:;' className='button is-success' onClick={(e) => this.onDeposit()}>Deposit</a>
          <a href='javascript:;' className='button is-warning' onClick={(e) => this.onWithdraw()}>Withdraw</a>

          <table className='table is-striped'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Action</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.state.events.map((event) =>
                <EventRow event={event} key={`${event.blockNumber}-${event.logIndex}`} />
              )}
            </tbody>
          </table>
        </div>
    } else {
      validatorLabel = 'Validator'
      content = <Loading />
    }

    return (
      <section className='section'>
        <div className='container'>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li><Link to='/'>Polystake</Link></li>
              <li><Link to='/validator'>Validators</Link></li>
              <li className="is-active"><Link to={`/validator/${this.props.match.params.index}`}>{validatorLabel}</Link></li>
            </ul>
          </nav>

          {content}
        </div>
      </section>
    )
  }
})

Validator.propTypes = {
  match: PropTypes.object.isRequired
}
