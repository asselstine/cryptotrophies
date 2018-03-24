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
      instance.getTrophyType(this.props.trophyId).then((response) => {
        var trophyType = parseInt(response.toString())
        this.setState({type: trophyType})
      })

      instance.getTrophyTitle(this.props.trophyId).then((response) => {
        var trophyTitle = response.toString()
        this.setState({title: trophyTitle})
      })

      instance.getTrophyInscription(this.props.trophyId).then((response) => {
        var trophyInscription = response.toString()
        this.setState({inscription: trophyInscription})
      })
    })
  }

  render () {
    var img
    if (this.state.type !== null) {
      img = (
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={TROPHY_URLS[this.state.type]} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.state.title}</p>
              </div>
            </div>

            <div className="content">
              {this.state.inscription}
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br />
              <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>
      )

    } else {
      img = <span>{this.props.trophyId.toString()}</span>
    }

    return (
      <span>{img}</span>
    )
  }
}
