import React, {
  Component
} from 'react'

import CustomizeAward from './customize-award'
import AwardList from './award-list'

export class CreateAward extends Component {

  constructor (props) {
    super(props)

    this.state = {
      awards: []
    }
  }

  onBuy () {
    this.refreshAwardList()
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
        <h1>
          Hello!
        </h1>
        <CustomizeAward onBuy={() => this.onBuy()} />
        <AwardList awards={this.state.awards} />
      </div>
    )
  }

}
