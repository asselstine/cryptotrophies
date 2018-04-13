import React, {
  Component
} from 'react'

import CryptoTrophies from '@/contracts/cryptotrophies-factory'
import AwardListItem from './award-list-item'

export default class extends Component {
  render () {
    return (
      <section className='section'>
        <div className='container'>
          <div className="columns">
              {
                this.props.awards.map(
                  award => {
                    return (
                      <div key={award} className="column is-half-desktop">
                        <AwardListItem awardId={award} />
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
