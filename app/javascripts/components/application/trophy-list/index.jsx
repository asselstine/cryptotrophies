import React, {
  Component
} from 'react'

import CryptoTrophies from '@/contracts/cryptotrophies-factory'
import TrophyListItem from './trophy-list-item'

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
              trophy => <TrophyListItem key={trophy} trophyId={trophy} />
            )
          }
        </div>
      </section>
    )
  }
}
