import React, {
  Component
} from 'react'

import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default class extends Component {
  componentDidMount () {
    CryptoTrophies().deployed().then((instance) => {
      this.boughtTrophy = instance.BoughtTrophy({ buyer: web3.eth.accounts[0] })
      this.boughtTrophy.watch((error, result) => {
        if (!error) {
          this.props.onBuy()
          console.log(result)
        } else {
          console.error(error)
        }
      })
    })
  }

  componentWillUnmount() {
    this.boughtTrophy.stopWatching()
  }

  onClick () {
    CryptoTrophies().deployed().then((instance) => {
      instance.buyTrophy().then((result) => {
        console.log(result)
      }).catch((error) => {
        console.error(error)
      })

    }).catch((error) => {
      console.error(error)
    })
  }

  render () {
    return (
      <section className='section'>
        <div className='container'>
          <button className='button is-primary' onClick={(e) => this.onClick()}>Buy Trophy</button>
        </div>
      </section>
    )
  }
}
