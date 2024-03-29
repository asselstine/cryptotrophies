import React, {
  Component
} from 'react'
import {
  addressOrBlankString
} from '@/helpers/address-helpers'
import { Link } from 'react-router-dom'

import getAwardService from '@/services/get-award'
import awardTypeImageUrlService from '@/services/award-type-image-url'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    getAwardService(this.props.awardId).then((values) => {
      this.setState({
        type: values[0],
        title: values[1],
        inscription: values[2],
        recipient: values[3]
      })
    })
  }

  render () {
    let awardLinkUrl = `/awards/${this.props.awardId}`
    let recipientAddress = addressOrBlankString(this.state.recipient)

    return (
      <tr>
        <td>
          <Link to={awardLinkUrl}>
            <img src={awardTypeImageUrlService(this.state.type, 'small')} className='award-row__award-img' />
          </Link>
        </td>
        <td><Link to={awardLinkUrl}>{this.state.title}</Link></td>
        <td><Link to={awardLinkUrl}>{this.state.inscription}</Link></td>
        <td><Link to={awardLinkUrl}>{recipientAddress}</Link></td>
      </tr>
    )
  }
}
