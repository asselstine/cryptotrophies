import React, {
  Component
} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import polystakeContract from '../../../contracts/polystake-contract'

export class NewValidatorForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      validatorAddress: window.web3.eth.accounts[0],
      withdrawalAddress: '',
    }
    this.submitNewContract = this.submitNewContract.bind(this)
  }

  submitNewContract (event) {
    event.preventDefault()
    var sender = window.web3.eth.accounts[0]
    var withdrawalAddress = this.state.withdrawalAddress || sender
    polystakeContract().deployed().then((instance) => {
      instance.newValidator(withdrawalAddress, { from: sender })
    })
  }

  render () {
    return (
      <form onSubmit={this.submitNewContract}>
        <div className='field'>
          <label className='label is-medium'>Validator Address</label>
          <div className='control'>
            <input
              className="input"
              type='text'
              required
              value={this.state.validatorAddress}
              onChange={(e) => this.setState({validatorAddress: e.target.value})} />
          </div>
        </div>
        <div className='field'>
          <label className='label is-medium'>Withdrawal Address</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              placeholder={window.web3.eth.accounts[0]}
              pattern="0x[A-Fa-f0-9]{40}"
              value={this.state.withdrawalAddress}
              onChange={(e) => this.setState({withdrawalAddress: e.target.value})} />
          </div>
        </div>
        <input type='submit' className='button is-success' value='New' />
      </form>
    )
  }
}
