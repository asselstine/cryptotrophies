import React from 'react'

export const NewDepositForm = ({ onSubmit, deposit, onChangeDeposit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='field'>
        <label className='label is-medium'>Deposit Amount</label>
        <div className='control'>
          <input
            className="input"
            type='number'
            required
            value={deposit}
            onChange={onChangeDeposit} />
        </div>
      </div>
      <input type='submit' className='button is-success' value='Deposit' />
    </form>
  )
}
