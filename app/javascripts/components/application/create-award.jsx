import React, {
  Component
} from 'react'

import IvyAward from '@/contracts/ivyaward-factory'
import CustomizeAward from './customize-award'
import AwardList from './award-list'

export default class extends Component {
  onBuy () {
  }

  render () {
    return (
      <div>
        <CustomizeAward onBuy={() => this.onBuy()} />
      </div>
    )
  }

}
