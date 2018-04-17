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
            <a className="navbar-item" href="https://ivyblockchainawards.com">
              <img src="/images/logos/ivy--logo-and-wordmark.png" />
            </a>

            <div id="navbarBurger" className="navbar-burger burger" data-target="navMenuDocumentation">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
