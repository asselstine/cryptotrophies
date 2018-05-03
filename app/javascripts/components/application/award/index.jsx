import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import { Address } from '@/components/address'
import IvyTilt from '@/components/application/utils/ivy-tilt'

import IvyAward from '@/contracts/ivyaward-factory'

import awardTypeImageUrlService from '@/services/award-type-image-url'
import getAwardService from '@/services/get-award'

require('./style.scss')

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: null,
      animateAward: false,
      animateSheen: false,
      errorMessage: ''
    }
  }

  awardId () {
    return this.props.match.params.awardId
  }

  componentDidMount () {
    var awardId = this.awardId()

    getAwardService(awardId).then((values) => {
      this.setState({
        type: values[0],
        title: values[1],
        inscription: values[2],
        recipient: values[3]
      })
    }).catch((error) => {
      this.setState({ errorMessage: error })
    })

    setTimeout(() => {
      this.setState({
        animateAward: true,
        animateSheen: true
      })
    }, 800)
  }

  render () {
    var errorMessage
    var awardId = this.awardId()
    let editAwardLinkUrl = `/awards/${awardId}/edit`

    if (this.state.errorMessage) {
      var errorMessage = <p className='help is-danger'>{this.state.errorMessage}</p>
    }

    var content
    if (this.state.type !== null) {
      content = (
        <div>
          <div className="award columns is-centered">
            <div className='column is-three-quarters-tablet is-three-quarters-desktop is-one-half-widescreen is-one-half-fullhd has-text-centered'>
              <div className='border--thick'>
                <div className='border--thin'>

                  <a className="ivy-button award__share-link" href="#"><i className="fas fa-lg fa-share-alt"></i></a>
                  <Link to={editAwardLinkUrl} className="ivy-button award__edit-link">
                    <i className="fas fa-lg fa-pencil-alt"></i>
                  </Link>



                  <div className="award__shiny">
                    <div
                      className={this.state.animateSheen ? 'award__show-off is-animating' : 'award__show-off' } />

                    <IvyTilt>
                      <figure
                        className={this.state.animateAward ? 'award__image is-animating' : 'award__image' }>
                        <img src={awardTypeImageUrlService(this.state.type)} />
                      </figure>
                    </IvyTilt>
                  </div>


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
                <h5 className='title is-5'>
                  Award Details:
                </h5>
                <p className="has-text-grey border--thick">
                  Recipient: <Address address={this.state.recipient} />
                </p>
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
          {errorMessage}
        </div>
      </section>
    )
  }
}
