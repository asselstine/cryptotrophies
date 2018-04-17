import React, {
  Component
} from 'react'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import CryptoTrophies from '@/contracts/cryptotrophies-factory'

import SiteHeader from './layout/site-header'

import { Dashboard } from './dashboard'
import { CreateAward } from './create-award'

export class Application extends Component {

  render (){
    var contents

    if (window.web3 && web3.eth.accounts.length) {

      return (
          <div>
            <SiteHeader />

            <Route exact path='/'>
              <Dashboard />
            </Route>
            <Route path='/create_award'>
              <CreateAward />
            </Route>
          </div>
        )

      } else if (window.web3) {
        contents =
          <div>
            <SiteHeader />
            <section className="hero is-fullheight">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h1 className="title">
                    Whoops!
                  </h1>
                  <h2 className="subtitle">
                    The MetaMask browser extension is installed, but you need to create an account! Please create an account then refresh the page.
                  </h2>
                </div>
              </div>
            </section>
          </div>
      } else {
        contents =
          <div>
            <SiteHeader />
            <section className="hero is-fullheight">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h1 className="title">
                    Whoops!
                  </h1>
                  <h2 className="subtitle">
                    You need to install the <a href='https://metamask.io/' title='MetaMask' target='_blank'>MetaMask</a> extension for your browser.
                  </h2>
                </div>
              </div>
            </section>
          </div>
      }

    return (
      contents
    )
  }
}
