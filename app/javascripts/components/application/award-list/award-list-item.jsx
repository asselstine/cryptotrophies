import React, {
  Component
} from 'react'

import awardUrl from '@/services/award-url'
import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: null
    }
  }

  componentDidMount () {
    CryptoTrophies().then((instance) => {
      instance.getAwardType(this.props.awardId).then((response) => {
        var awardType = parseInt(response.toString())
        this.setState({type: awardType})
      })

      instance.getAwardTitle(this.props.awardId).then((response) => {
        var awardTitle = response.toString()
        this.setState({title: awardTitle})
      })

      instance.getAwardInscription(this.props.awardId).then((response) => {
        var awardInscription = response.toString()
        this.setState({inscription: awardInscription})
      })

      instance.getAwardRecipient(this.props.awardId).then((response) => {
        console.log(response)
        var awardRecipient = response.toString()
        this.setState({recipient: awardRecipient})
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
              <img src={awardUrl(this.state.type)} />
            </figure>
          </div>
          <div className="card-content">
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
                Recipient: <a href="#">{this.state.recipient}</a>
              </p>
            </div>
          </div>
        </div>
      )

    } else {
      img = <span>{this.props.awardId.toString()}</span>
    }

    return (
      <span>{img}</span>
    )
  }
}
