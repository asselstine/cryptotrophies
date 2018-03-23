import React from 'react'

import {
  Link
} from 'react-router-dom'

export const Login = () => {
  return (
    <section className="section">
      <div className="container">
        <div className='columns is-centered'>
          <div className='column is-three-quarters'>
            <div className='tile is-ancestor'>
              <div className='tile is-parent'>
                <article className='tile is-child notification is-primary'>
                  <h2 className='title'>Validator</h2>
                  <h3 className='subtitle'>If you'd like to earn money by managing a Casper validator</h3>
                  <Link className='button is-primary is-inverted is-outlined' to='/validator'>Continue</Link>
                </article>
              </div>
              <div className='tile is-parent'>
                <article className='tile is-child notification is-success'>
                  <h2 className='title'>Staker</h2>
                  <h3 className='subtitle'>If you'd like to earn money with Ether you have lying around</h3>
                  <a className='button is-success is-inverted is-outlined'>Continue</a>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
