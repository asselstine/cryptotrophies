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
      instance.buyTrophy(this.state.selectedTrophy).then((result) => {
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
          <h1>
            Choose a trophy:
          </h1>
          {_.range(TROPHY_URLS.length).map(index => {
            var url = TROPHY_URLS[index]
            var selected = this.state.selectedTrophy === index
            return (
              <TrophyItem
                key={index}
                url={url}
                onClick={() => this.onClickTrophy(index)}
                selected={selected} />
            )
          })}
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
