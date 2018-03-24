import React, {
  Component
} from 'react'
import _ from 'lodash'
import CryptoTrophies from '@/contracts/cryptotrophies-factory'

import { TROPHY_URLS, TrophyImage } from '@/components/trophy-image'

import TrophyItem from './trophy-item'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: "",
      inscription: "",
      selectedTrophy: null
    }
    this.onClickTrophy = this.onClickTrophy.bind(this)
  }

  componentDidMount () {
    CryptoTrophies().deployed().then((instance) => {
      this.boughtTrophy = instance.BoughtTrophy({ buyer: web3.eth.accounts[0] })
      this.boughtTrophy.watch((error, result) => {
        if (!error) {
          this.props.onBuy()
          console.log(result)
        } else {
          console.error(error)
        }
      })
    })
  }

  componentWillUnmount() {
    this.boughtTrophy.stopWatching()
  }

  onClickBuy () {
    CryptoTrophies().deployed().then((instance) => {
      instance.buyTrophy(this.state.selectedTrophy, this.state.title, this.state.inscription).then((result) => {
        console.log(result)
      }).catch((error) => {
        console.error(error)
      })

    }).catch((error) => {
      console.error(error)
    })
  }

  onClickTrophy (index) {
    this.setState({ selectedTrophy: index })
  }

  render () {
    return (
      <section className='section'>
        <div className='container'>
          <label className="label">Choose a trophy:</label>

          <div className="columns">
            {_.range(TROPHY_URLS.length).map(index => {
              var url = TROPHY_URLS[index]
              var selected = this.state.selectedTrophy === index
              return (
                <div key={index} className="column">
                  <TrophyItem
                    url={url}
                    onClick={() => this.onClickTrophy(index)}
                    selected={selected} />
                </div>
              )
            })}
          </div>

          <div className="field">
            <label className="label">Trophy Title</label>
            <div className="control">
              <input placeholder="Write the trophy title here" className="input" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
            </div>
          </div>

          <div className="field">
            <label className="label">Trophy Inscription</label>
            <div className="control">
              <textarea placeholder="Write the trophy inscription here" className="textarea" value={this.state.inscription} onChange={(e) => this.setState({ inscription: e.target.value })} />
            </div>
          </div>
          <span>0 / 256</span>

          <br />
          <button
            disabled={this.state.selectedTrophy === null}
            className='button is-primary'
            onClick={(e) => this.onClickBuy()}>
            Buy Trophy
          </button>
        </div>
      </section>
    )
  }
}
