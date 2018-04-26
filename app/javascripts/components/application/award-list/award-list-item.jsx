import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

import { Address } from '@/components/address'
import awardUrl from '@/services/award-url'
import getAward from '@/services/get-award'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: null
    }
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
    var img
    if (this.state.type !== null) {
      img = (
        <div className="card">
          <div className="card-image">
            <figure className="image">
              <Link to={`/awards/${this.props.awardId}`}>
                <img src={awardUrl(this.state.type)} />
              </Link>
            </figure>
          </div>

          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">
                  {this.state.title}
                </p>
              </div>
            </div>

            <div className="content">
              <p>
                {this.state.inscription}
              </p>
              <p>
                Recipient: <Address address={this.state.recipient} />
              </p>
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
