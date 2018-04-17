import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

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
            <Link to="/" className="navbar-item">
              <img src="/images/logos/ivy--logo-and-wordmark.png" />
            </Link>
          </div>

          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <Link to="/create_award" className="button is-dark navbar-item">
                  <span>Create a new Award</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </nav>
    )
  }
}
