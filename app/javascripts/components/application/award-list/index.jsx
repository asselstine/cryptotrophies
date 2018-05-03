import React, {
  Component
} from 'react'

import IvyAward from '@/contracts/ivyaward-factory'
import AwardListItem from './award-list-item'

export default class extends Component {
  render () {
    var content
    if (this.props.awards.length) {
      content =
        <section className='section'>
          <div className='container'>
            <div className="columns is-multiline">
                {
                  this.props.awards.map(
                    award => {
                      return (
                        <div key={award} className="column is-one-quarter-desktop">
                          <AwardListItem awardId={award} />
                        </div>
                      )
                    }
                  )
                }
            </div>
          </div>
        </section>
    } else {
      content =
        <section className='hero is-medium'>
          <div className='hero-body'>
            <div className='container'>
              <h1 className='title has-text-grey-light has-text-centered'>
                You haven't received any awards yet.
              </h1>
            </div>
          </div>
        </section>
    }

    return content;
  }
}
