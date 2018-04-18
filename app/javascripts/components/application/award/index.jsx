import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import { Address } from '@/components/address'
import awardUrl from '@/services/award-url'
import CryptoTrophies from '@/contracts/cryptotrophies-factory'
import getAward from '@/services/get-award'

require('./style')

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
    getAward(awardId).then((values) => {
      this.setState({
        type: values[0],
        title: values[1],
        inscription: values[2],
        recipient: values[3]
      })
    })
  }

  render () {
    var content
    if (this.state.type !== null) {
      content = (

        <div className="columns is-centered">
          <div className='column is-half-desktop has-text-centered'>
            <figure className="award__image">
              <img src={awardUrl(this.state.type)} />
            </figure>

            <p className="title is-4">{this.state.title}</p>

            <div className="content">
              <p>
                {this.state.inscription}
              </p>
              <p>
                Recipient: <small><Address address={this.state.recipient} /></small>
              </p>
            </div>
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
