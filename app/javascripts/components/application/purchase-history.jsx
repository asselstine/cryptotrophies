import React, {
  Component
} from 'react'

import CryptoTrophies from '@/contracts/cryptotrophies-factory'
import AwardList from './award-list'

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
    return (
      <div>
        <AwardList awards={this.state.awards} />
      </div>
    )
  }
}
