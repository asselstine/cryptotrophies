import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import getAward from '@/services/get-award'
import awardUrl from '@/services/award-url'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    getAward(this.props.awardId).then((values) => {
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
    let claimLinkUrl = `${location.origin}/awards/${this.props.awardId}?claimToken=ASDF1234`

    return (
      <tr>
        <td>
          <Link to={awardLinkUrl}>
            <img src={awardUrl(this.state.type, 'small')} className='award-row__award-img' />
          </Link>
        </td>
        <td><Link to={awardLinkUrl}>{this.state.title}</Link></td>
        <td><Link to={awardLinkUrl}>{this.state.inscription}</Link></td>
        <td><Link to={awardLinkUrl}>{this.state.recipient}</Link></td>
        <td>{claimLinkUrl}</td>
      </tr>
    )
  }
}
