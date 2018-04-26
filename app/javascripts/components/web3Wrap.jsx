import React, {
  Component
} from 'react'

import SiteHeader from '@/components/application/layout/site-header'

import DownloadMetamaskButtonImg from '../../images/button--download-metamask.png'

import AppStoreButtonImg from '../../images/button--app-store.png'
import PlayStoreButtonImg from '../../images/button--play-store.png'

export default function web3Wrap(WrappedComponent) {

  // ...and returns another component...
  return class extends React.Component {

    render () {
      var contents

      if (window.web3 && web3.eth.accounts.length) {

        return <WrappedComponent {...this.props} />

      } else if (window.web3) {
        return (
          <div>
            <section className="hero">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h1 className="title">
                    One second ...
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
            <section className="hero">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <div className="columns">
                    <div className="column" />
                    <div className="column is-two-thirds">
                      <h1 className="title">
                        One second ...
                      </h1>
                      <h2 className="subtitle">
                        To use Ivy you will need to install the <a href='https://metamask.io/' title='MetaMask' target='_blank'>MetaMask</a> extension for Chrome or Brave desktop browsers:
                      </h2>
                      <a href="https://metamask.io" title="Download Metamask"><img src={`/${DownloadMetamaskButtonImg}`} alt="Metamask Download Button" width="200" /></a>
                      <br />
                      <br />

                      <h2 className="subtitle">
                        If you're on mobile, download the Trust browser:
                      </h2>
                      <a href="https://itunes.apple.com/us/app/trust-ethereum-wallet/id1288339409" title="Download Trust from Apple App Store"><img src={`/${AppStoreButtonImg}`} alt="Apple App Store Button" /></a>
                      &nbsp; &nbsp; &nbsp;
                      <a href="https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp" title="Download Trust from Google Play Store"><img src={`/${PlayStoreButtonImg}`} alt="Google Play Store Button" /></a>
                    </div>
                    <div className="column" />
                  </div>
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
