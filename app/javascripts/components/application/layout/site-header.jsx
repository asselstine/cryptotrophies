import React, {
  Component
} from 'react'

require('./site-header.css')

export default class extends Component {
  render () {
    return (
      <nav id="navbar" class="navbar">
        <div id="specialShadow" class="bd-special-shadow">
        </div>

        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="https://ivyblockchainawards.com">
              <img src="/images/logos/ivy--symbol.png" />
              <img src="/images/logos/ivy--logo.png" />
            </a>

            <div id="navbarBurger" class="navbar-burger burger" data-target="navMenuDocumentation">
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
