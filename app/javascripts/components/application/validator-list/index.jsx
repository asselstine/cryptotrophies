import React, {
  Component
} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { NewValidatorForm } from './new-validator-form'
import polystakeContract from '../../../contracts/polystake-contract'
import { connect } from 'react-redux'
import retrieveValidatorCount from '../../../services/retrieve-validator-count'
import retrieveValidator from '../../../services/retrieve-validator'
import { ValidatorRow } from './validator-row'
import { Modal } from '../../modal'
import { Address } from '../../address'

export const ValidatorList = connect(
  (state, ownProps) => {
    return {
      validatorCount: _.get(state, 'validators.count') || []
    }
  }
)(class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showNewValidatorForm: false
    }
  }

  componentDidMount () {
    retrieveValidatorCount()
  }

  render () {
    return (
      <section className='section'>
        <div className='container'>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li><Link to='/'>Polystake</Link></li>
              <li className="is-active"><Link to='/validator'>Validators</Link></li>
            </ul>
          </nav>
          <Modal isOpen={this.state.showNewValidatorForm} onClose={(e) => this.setState({ showNewValidatorForm: false })}>
            <div className='box'>
              <h1 className='title'>Create New Validator</h1>
              <NewValidatorForm />
            </div>
          </Modal>
          <a href='javascript:;' onClick={() => this.setState({ showNewValidatorForm: true })} className='button'>New Contract</a>
          <table className='table is-striped'>
            <thead>
              <tr>
                <th>Validator Address</th>
                <th>Withdrawal Address</th>
                <th>Validator Deposit</th>
                <th>Total Deposits</th>
                <th>Stage</th>
              </tr>
            </thead>
            <tbody>
              {
                _.range(this.props.validatorCount).map(
                  index => <ValidatorRow index={index} key={index} />
                )
              }
            </tbody>
          </table>
        </div>
      </section>
    )
  }
})

ValidatorList.propTypes = {
  validatorCount: PropTypes.number.isRequired
}

ValidatorList.defaultProps = {
  validatorCount: 0
}
