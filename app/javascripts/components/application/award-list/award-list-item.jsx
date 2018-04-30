import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import { Address } from '@/components/address'
import awardTypeImageUrlService from '@/services/award-type-image-url'
import getAwardService from '@/services/get-award'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: null
    }
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
    var img
    if (this.state.type !== null) {
      img = (
        <div className="card">
          <div className="card-image">
            <figure className="image">
              <Link to={`/awards/${this.props.awardId}`}>
                <img src={awardTypeImageUrlService(this.state.type)} />
              </Link>
            </figure>
          </div>

          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="subtitle is-5">
                  <Link to={`/awards/${this.props.awardId}`}>
                    {this.state.title}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )

    } else {
      img = <span></span>
    }

    return (
      <span>{img}</span>
    )
  }
}
