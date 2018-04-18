import React, {
  Component
} from 'react'

import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default class extends Component {

  render () {
    return (
      <div>
        <section className="hero is-dark is-medium">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                <i className="fas fa-2x fa-trophy"></i>
                <br />
                Recognize Those Who Deserve It
              </h1>
              <h2 className="subtitle">
                Ivy helps you provide recognition to your
                <br /> colleagues, participants, friends, &amp; others.
              </h2>
            </div>
          </div>
        </section>

        <section className='section'>
          <div className='container'>
          </div>
        </section>
      </div>
    )
  }

}
