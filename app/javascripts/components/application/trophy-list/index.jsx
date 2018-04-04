import React, {
  Component
} from 'react'

import CryptoTrophies from '@/contracts/cryptotrophies-factory'
import TrophyListItem from './trophy-list-item'

export default class extends Component {
  // onClick () {
  //   CryptoTrophies().deployed().then((instance) => {
  //
  //     instance.buyAward().then((result) => {
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
          <div className="columns">
              {
                this.props.trophies.map(
                  trophy => {
                    return (
                      <div key={trophy} className="column is-half-desktop">
                        <TrophyListItem trophyId={trophy} />
                      </div>
                    )
                  }
                )
              }
          </div>
        </div>
      </section>
    )
  }
}
