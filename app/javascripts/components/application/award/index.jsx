import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import { Address } from '@/components/address'
import awardUrl from '@/services/award-url'
import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: null
    }
  }

  awardId () {
    return this.props.match.params.awardId
  }

  componentDidMount () {
    var awardId = this.awardId()
    CryptoTrophies().then((instance) => {
      instance.getAwardType(awardId).then((response) => {
        var awardType = parseInt(response.toString())
        this.setState({type: awardType})
      })

      instance.getAwardTitle(awardId).then((response) => {
        var awardTitle = response.toString()
        this.setState({title: awardTitle})
      })

      instance.getAwardInscription(awardId).then((response) => {
        var awardInscription = response.toString()
        this.setState({inscription: awardInscription})
      })

      instance.getAwardRecipient(awardId).then((response) => {
        var awardRecipient = response.toString()
        this.setState({recipient: awardRecipient})
      })
    })
  }

  render () {
    var content
    if (this.state.type !== null) {
      content = (
        <div className="columns">
          <div className="column is-three-quarter-desktop">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.state.title}</p>
              </div>
            </div>

            <div className="content">
              <p>
                {this.state.inscription}
              </p>
              <p>
                Recipient: <small><Address address={this.state.recipient} /></small>
              </p>
            </div>
          </div>
          <div className='column is-one-quarter-desktop'>
            <figure className="image">
              <Link to={`/awards/${this.awardId()}`}>
                <img src={awardUrl(this.state.type)} />
              </Link>
            </figure>
          </div>
        </div>
      )
    }

    return (
      <section className='section'>
        <div className='container'>
          {content}
        </div>
      </section>
    )
  }
}
