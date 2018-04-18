import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import '@/../stylesheets/app';
import './site-header.css';

export default class extends Component {
  render () {
    return (
      <nav id="navbar" className="navbar">
        <div id="specialShadow" className="bd-special-shadow">
        </div>

        <div className="container">
          <div className="navbar-brand">
            <Link to="/">
              <div className="navbar-item">
                <img src="/images/logos/ivy--logo-and-wordmark-small.png" />
              </div>
            </Link>
          </div>

          <div className="navbar-menu">
            <div className="navbar-end">
              <Link to='/awards/received' className='navbar-item'>
                <span>My Awards</span>
              </Link>
              <Link to='/awards/purchased' className='navbar-item'>
                <span>Purchase History</span>
              </Link>
              <div className="navbar-item">
                <Link to="/awards/new" className="button is-dark navbar-item">
                  <span>Purchase Award</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </nav>
    )
  }
}
