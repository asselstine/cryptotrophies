import React, {
  Component
} from 'react'

import SiteHeader from '@/components/application/layout/site-header'


export default function web3Wrap(WrappedComponent) {

  // ...and returns another component...
  return class extends React.Component {

    render () {
      var contents

      if (window.web3 && web3.eth.accounts.length) {

        return <WrappedComponent />

      } else if (window.web3) {
        return (
          <div>
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
        )
      } else {
        return (
          <div>
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
        )
      }

      return contents
    }

  }

}
