import React, {
  Component
} from 'react'

import '@/../stylesheets/app.css';
import './site-header.css';

export default class extends Component {
  render () {
    return (
      <nav id="navbar" className="navbar">
        <div id="specialShadow" className="bd-special-shadow">
        </div>

        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="/images/logos/ivy--logo-and-wordmark.png" />
            </a>
          </div>

          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <a className="button is-dark navbar-item" href="/create_award">
                  <span>Create a new Award</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </nav>
    )
  }
}
