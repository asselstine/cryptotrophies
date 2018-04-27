import React, {
  Component
} from 'react'

import CryptoTrophies from '@/contracts/cryptotrophies-factory'
import AwardRow from './award-row'

require('./style')

export default class extends Component {

  constructor (props) {
    super(props)
    this.state = {
      awards: []
    }
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

  render () {
    var content
    if (this.state.awards.length) {
      content =
        <section className='section'>
          <div className='container'>
            <div className='table__wrapper'>
              <table className='table is-striped is-fullwidth'>
                <thead>
                  <tr>
                    <th>
                    </th>
                    <th>
                      Title
                    </th>
                    <th>
                      Inscription
                    </th>
                    <th>
                      Recipient
                    </th>
                    <th>
                      Claim Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.awards.map((awardId) => <AwardRow awardId={awardId} key={awardId} /> )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
    } else {
      content =
        <section className='hero is-medium'>
          <div className='hero-body'>
            <div className='container'>
              <h1 className='title has-text-grey-light has-text-centered'>
                You haven't purchased any awards.
              </h1>
            </div>
          </div>
        </section>
    }
    return content
  }
}
