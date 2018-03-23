import React, {
  Component
} from 'react'

import CryptoTrophies from '@/contracts/cryptotrophies-contract'

export default class extends Component {
  onClick () {
    CryptoTrophies().deployed().then((instance) => {
      instance.buyTrophy().then((result) => {

        this.props.onBuy()

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
