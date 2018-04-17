import React, {
  Component
} from 'react'
import range from 'lodash.range'
import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import BoughtAwardSubscriber from '@/subscribers/bought-award-subscriber'
import buyAward from '@/services/buy-award'
import AwardType from '../award-type'
import awardUrl from '@/services/award-url'
import style from './style'
import QrReaderWebrtc from './qr-reader/qr-reader-webrtc'
import QrReaderImage from './qr-reader/qr-reader-image'
import QrReader from './qr-reader'

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
    this.onAddress = this.onAddress.bind(this)
    this.boughtAwardSubscriber = new BoughtAwardSubscriber(() => this.props.onBuy())
  }

  componentWillUnmount() {
    this.boughtAwardSubscriber.stop()
  }

  onAddress (address) {
    address = address.slice(address.indexOf('0x'))
    this.setState({recipient: address })
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

    if (this.state.address) {
      var qrReader = this.state.address
    } else {

    }

    var qrReader =
      <QrReader onAddress={this.onAddress} />

    if (this.state.address) {
      var address = <div>{this.state.address}</div>
    }

    return (
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column is-one-half-desktop'>

              <div className="ivy-form">
                <div className="ivy-form--wrapper">

                  <div className="columns is-mobile">
                    {range(2).map(index => {
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
                        placeholder="What this award's for (ie. Vancity Hackathon 2018)"
                        className="input"
                        value={this.state.title}
                        onChange={(e) => this.setState({ title: e.target.value })} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Inscription</label>
                    <div className="control">
                      <textarea
                        placeholder="If you know the winner(s), write their name and pertinent info here"
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

                    <div className='control'>
                      {qrReader}
                    </div>
                  </div>

                  <br />
                  <button
                    disabled={this.state.selectedTrophy === null}
                    className='button is-primary is-medium'
                    onClick={(e) => this.onClickBuy()}>
                    Buy Award
                  </button>
                </div>
              </div>
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
