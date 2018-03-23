import React, {
  Component
} from 'react'

import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default class extends Component {
  // onClick () {
  //   CryptoTrophies().deployed().then((instance) => {
  //
  //     instance.buyTrophy().then((result) => {
  //
  //     }).catch((error) => {
  //       console.error(error)
  //     })
  //
  //   }).catch((error) => {
  //     console.error(error)
  //   })
  // }

  render () {
    return (
      <section className='section'>
        <div className='container'>
          {
            this.props.trophies.map(
              trophy => `${trophy}`
            )
          }
        </div>
      </section>
    )
  }
}
