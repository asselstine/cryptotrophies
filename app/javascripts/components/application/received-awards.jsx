import React, {
  Component
} from 'react'

import IvyAward from '@/contracts/ivyaward-factory'
import AwardList from './award-list'

export default class extends Component {

  constructor (props) {
    super(props)
    this.state = {
      awards: []
    }
  }

  componentDidMount () {
    IvyAward().then((instance) => {
      this.boughtAward = instance.BoughtAward({recipient: web3.eth.accounts[0]}, {fromBlock: 0, toBlock: 'latest'})
      this.boughtAward.watch((error, result) => {
        if (error) console.error(error)
        else this.setState({awards: this.state.awards.concat([result.args.awardId])})
      })
    }).catch((error) => {
      console.error(error)
    })
  }

  componentWillUnmount () {
    if (this.boughtAward) this.boughtAward.stopWatching()
  }

  render () {
    return (
      <div>
        <AwardList awards={this.state.awards} />
      </div>
    )
  }
}
