import React, {
  Component
} from 'react'
import _ from 'lodash'

import BoughtTrophySubscriber from '@/subscribers/bought-trophy-subscriber'
import buyAward from '@/services/buy-award'
import AwardType from '../award-type'
import awardUrl from '@/services/award-url'
import style from './style'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedAwardType: 0,
      title: '',
      inscription: ''
    }
    this.boughtTrophySubscriber = new BoughtTrophySubscriber(() => this.props.onBuy())
  }

  componentWillUnmount() {
    this.boughtTrophySubscriber.stop()
  }

  onClickBuy () {
    buyAward(this.state.selectedAwardType, this.state.title, this.state.inscription)
  }

  onClickAwardType (index) {
    this.setState({ selectedAwardType: index })
  }

  render () {
    if (this.state.selectedAwardType !== null) {
      var selectedAwardType =
        <img
          src={awardUrl(this.state.selectedAwardType)}
          className='customize-award__img' />
    }

    return (
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column is-one-third'>
              <div className="columns">
                {_.range(2).map(index => {
                  var selected = this.state.selectedAwardType === index
                  return (
                    <div key={index} className="column is-one-third-tablet is-one-quarter-desktop">
                      <AwardType
                        url={awardUrl(index, 'small')}
                        onClick={() => this.onClickAwardType(index)}
                        selected={selected} />
                    </div>
                  )
                })}
              </div>

              <div className="field">
                <label className="label">Trophy Title</label>
                <div className="control">
                  <input
                    placeholder="Write the trophy title here"
                    className="input"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })} />
                </div>
              </div>

              <div className="field">
                <label className="label">Trophy Inscription</label>
                <div className="control">
                  <textarea
                    placeholder="Write the trophy inscription here"
                    className="textarea"
                    value={this.state.inscription}
                    onChange={(e) => this.setState({ inscription: e.target.value })} />
                </div>
              </div>

              <br />
              <button
                disabled={this.state.selectedTrophy === null}
                className='button is-primary'
                onClick={(e) => this.onClickBuy()}>
                Buy Trophy
              </button>
            </div>

            <div className='column'>
              {selectedAwardType}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
