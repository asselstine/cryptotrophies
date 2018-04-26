import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import { Address } from '@/components/address'
import IvyTilt from '@/components/application/utils/ivy-tilt'

import awardUrl from '@/services/award-url'
import CryptoTrophies from '@/contracts/cryptotrophies-factory'
import getAward from '@/services/get-award'

require('./style.scss')

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // type: null
      type: 1,
      title: 'Vancouver\'s Vancity Hackathon 2018 - 1st Place Winner',
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
        <div>
          <div className="award columns is-centered">
            <div className='column is-three-quarters-tablet is-three-quarters-desktop is-one-half-widescreen is-one-half-fullhd has-text-centered'>
              <div className='border--thick'>
                <div className='border--thin'>

                  <IvyTilt>
                    <figure className="award__image">
                      <img src={awardUrl(this.state.type)} />
                    </figure>
                  </IvyTilt>

                  <p className="award__title title has-text-grey">
                    {this.state.title}
                  </p>

                  <hr className="award__title_and_subtitle_ruler" />

                  <p className="award__subtitle subtitle">
                    {this.state.inscription}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="award-metadata columns is-centered">
              <div className='column is-three-quarters-tablet is-three-quarters-desktop is-one-half-widescreen is-one-half-fullhd has-text-centered'>
                <p className="has-text-grey border--thick">
                  Recipient: <Address address={this.state.recipient} />
                </p>

                <h5 className="title is-5">
                  <i className="fab fa-sm fa-twitter"></i> <a href="#">Tweet</a>
                </h5>
                <h5 className="title is-5">
                  <i className="fab fa-sm fa-facebook"></i> <a href="#">Facebook</a>
                </h5>
                <h5 className="title is-5">
                  <i className="fab fa-sm fa-linkedin"></i> <a href="#">LinkedIn</a>
                </h5>
                <h5 className="title is-5">
                  <i className="fas fa-sm fa-envelope"></i> <a href="#">Email This</a>
                </h5>
              </div>
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
