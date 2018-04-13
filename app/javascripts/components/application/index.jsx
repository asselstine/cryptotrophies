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
import AwardList from './award-list'

export class Application extends Component {

  constructor (props) {
    super(props)

    this.state = {
      awards: []
    }
  }

  onBuy () {
    this.refreshAwardList()
  }

  refreshAwardList() {
    CryptoTrophies().then((instance) => {

      instance.myAwards().then((result) => {

        this.setState({ awards: result })

      }).catch((error) => {
        console.error(error)
      })

    }).catch((error) => {
      console.error(error)
    })
  }

  componentDidMount() {
    this.refreshAwardList()
  }

  render (){
    var contents

    if (window.web3 && web3.eth.accounts.length) {

      contents =
        <div>
          <SiteHeader />
          <CustomizeAward onBuy={() => this.onBuy()} />
          <AwardList awards={this.state.awards} />
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
