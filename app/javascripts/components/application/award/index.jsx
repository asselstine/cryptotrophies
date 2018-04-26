import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import { Address } from '@/components/address'
import IvyTilt from '@/components/application/utils/ivy-tilt'

import awardUrl from '@/services/award-url'
import CryptoTrophies from '@/contracts/cryptotrophies-factory'
import getAward from '@/services/get-award'

require('./style')

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // type: null
      type: 1,
      title: 'Vancity Hackathon 2018 - 1st Place Winner',
      inscription: 'Awarded to Chuck Bergeron & Brendan Asselstine',
      recipient: '0x5B874D76f92332e9a5e805df931Dd2BC14c3e1A4'
    }
  }

  awardId () {
    return this.props.match.params.awardId
  }

  // componentDidMount () {
  //   var awardId = this.awardId()
  //   getAward(awardId).then((values) => {
  //     this.setState({
  //       type: values[0],
  //       title: values[1],
  //       inscription: values[2],
  //       recipient: values[3]
  //     })
  //   })
  // }

  render () {
    var content
    if (this.state.type !== null) {
      content = (

        <div className="columns is-centered">
          <div className='column is-half-desktop has-text-centered'>
            <IvyTilt>
              <figure className="award__image">
                <img src={awardUrl(this.state.type)} />
              </figure>
            </IvyTilt>

            <p className="title is-4">
              {this.state.title}
            </p>
            <p>
              {this.state.inscription}
            </p>
            <br />
            <br />
            <p>
              Recipient: <Address address={this.state.recipient} />
            </p>
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
