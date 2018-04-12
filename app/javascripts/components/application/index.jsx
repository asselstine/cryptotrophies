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

import CustomizeAward from './customize-award'
import TrophyList from './trophy-list'

export class Application extends Component {

  constructor (props) {
    super(props)

    this.state = {
      trophies: []
    }
  }

  onBuy () {
    this.refreshTrophyList()
  }

  refreshTrophyList() {
    CryptoTrophies().then((instance) => {

      instance.myAwards().then((result) => {

        this.setState({ trophies: result })

      }).catch((error) => {
        console.error(error)
      })

    }).catch((error) => {
      console.error(error)
    })
  }

  componentDidMount() {
    this.refreshTrophyList()
  }

  render (){
    var contents

    if (window.web3 && web3.eth.accounts.length) {

      contents =
        <div>
          <SiteHeader />
          <CustomizeAward onBuy={() => this.onBuy()} />
          <TrophyList trophies={this.state.trophies} />
        </div>

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
