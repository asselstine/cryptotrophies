import React, {
  Component
} from 'react'

import { TROPHY_URLS } from '@/components/trophy-image'
import CryptoTrophiesFactory from '@/contracts/cryptotrophies-factory'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: null
    }
  }

  componentDidMount () {
    CryptoTrophiesFactory().deployed().then((instance) => {
      console.log('mounted')
      instance.getTrophyType(this.props.trophyId).then((response) => {
        var trophyType = parseInt(response.toString())
        console.log('trophy type ', trophyType)
        this.setState({type: trophyType})
      })
    })
  }

  render () {
    var img
    if (this.state.type !== null) {
      img = <img src={TROPHY_URLS[this.state.type]} />
    } else {
      img = <span>{this.props.trophyId.toString()}</span>
    }

    return (
      <span>{img}</span>
    )
  }
}
