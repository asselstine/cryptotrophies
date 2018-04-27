import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import '@/../stylesheets/app';
import './site-header.css';

export default class extends Component {

  componentDidMount(){
    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {

          // Get the target from the "data-target" attribute
          var target = $el.dataset.target;
          var $target = document.getElementById(target);

          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active');
          $target.classList.toggle('is-active');

        });
      });
    }
  }

  render () {
    return (
      <nav id="navbar" className="navbar">
        <div id="specialShadow" className="bd-special-shadow">
        </div>

        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">
              <Link to="/">
                <img src="/images/logos/ivy--logo.png" />
              </Link>
            </div>

            <a role="button" className="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <Link to="/">
                  <h1 className="ivy--wordmark title is-4">Ivy</h1>
                </Link>
              </div>
            </div>
          </div>

          <div className="navbar-menu" id="navMenu">
            <div className="navbar-end">
              <Link to='/awards/received' className='navbar-item'>
                <span>My Awards</span>
              </Link>
              <Link to='/awards/purchased' className='navbar-item'>
                <span>Purchase History</span>
              </Link>
              <div className="navbar-item">
                <Link to="/awards/new" className="button is-dark">
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
