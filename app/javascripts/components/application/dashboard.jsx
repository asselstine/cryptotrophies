import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import IvyAward from '@/contracts/ivyaward-factory'

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

              <Link to="/awards/new" className="button is-pink is-large">
                <span>Award Somebody Right Now</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="hero is-medium">
          <div className="hero-body">
            <div className="container">
              <div className="content has-text-centered">

                <div className="columns">
                  <div className="column"></div>

                  <div className="column is-two-thirds">
                    <h1 className="title">
                      What is Ivy?
                    </h1>
                    <h2 className="subtitle">
                      <strong>Ivy</strong> is one of the first platforms for awarding individuals and permanently storing those acts of recognitions on the Ethereum blockchain. But instead of awarding a currency (like Bitcoin), you're awarding a public digital asset with permanence.
                    </h2>

                    <Link to="/awards/new" className="button is-primary is-large">
                      <span>Honor Somebody Now</span>
                    </Link>
                  </div>

                  <div className="column"></div>
                </div>


              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <strong>Ivy</strong> is a project by&nbsp;
                <a href="https://medium.com/@asselstine">Brendan Asselstine</a> &amp;&nbsp;
                <a href="https://chuckbergeron.io">Chuck Bergeron</a> circa 2018.
                <br />Built in Vancouver.
              </p>
            </div>
          </div>
        </footer>

      </div>
    )
  }

}
