import React, {
  Component
} from 'react'
import _ from 'lodash'
import classnames from 'classnames'

import BoughtAwardSubscriber from '@/subscribers/bought-award-subscriber'
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
      inscription: '',
      recipient: '',
      recipientError: null
    }
    this.boughtAwardSubscriber = new BoughtAwardSubscriber(() => this.props.onBuy())
  }

  componentWillUnmount() {
    this.boughtAwardSubscriber.stop()
  }

  onClickBuy () {
    if (!web3.isAddress(this.state.recipient)) {
      this.setState({ recipientError: 'Please enter a valid address' })
    } else {
      buyAward(this.state.selectedAwardType, this.state.title, this.state.inscription, this.state.recipient)
    }
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

    if (this.state.recipientError) {
      var recipientError =
        <p className="help is-danger">{this.state.recipientError}</p>
    }

    return (
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column is-one-third-desktop'>
              <div className="columns is-mobile">
                {_.range(2).map(index => {
                  var selected = this.state.selectedAwardType === index
                  return (
                    <div key={index} className="column rotate-in-center is-one-third-mobile is-one-third-tablet is-one-quarter-desktop">
                      <AwardType
                        url={awardUrl(index, 'small')}
                        onClick={() => this.onClickAwardType(index)}
                        selected={selected} />
                    </div>
                  )
                })}
              </div>

              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    placeholder="Write the trophy title here"
                    className="input"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })} />
                </div>
              </div>

              <div className="field">
                <label className="label">Inscription</label>
                <div className="control">
                  <textarea
                    placeholder="Write the trophy inscription here"
                    className="textarea"
                    value={this.state.inscription}
                    onChange={(e) => this.setState({ inscription: e.target.value })} />
                </div>
              </div>

              <div className="field">
                <label className="label">Recipient</label>
                <div className="control">
                  <input
                    placeholder="0xffffffffffffffffffffffffffffffff"
                    type='text'
                    maxLength='42'
                    className={classnames("input", { 'is-danger': !!recipientError })}
                    value={this.state.recipient}
                    onChange={(e) => this.setState({ recipient: e.target.value, recipientError: '' })} />
                </div>
                {recipientError}
              </div>

              <br />
              <button
                disabled={this.state.selectedTrophy === null}
                className='button is-primary'
                onClick={(e) => this.onClickBuy()}>
                Buy Award
              </button>
            </div>

            <div className='column is-one-third'>
              {selectedAwardType}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
