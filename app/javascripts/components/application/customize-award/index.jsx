import React, {
  Component
} from 'react'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import range from 'lodash.range'
import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'

import QrReaderWebrtc from './qr-reader-webrtc'
import QrReaderImage from './qr-reader-image'

import BoughtAwardSubscriber from '@/subscribers/bought-award-subscriber'
import awardUrl from '@/services/award-url'
import buyAward from '@/services/buy-award'
import getAward from '@/services/get-award'
import canUseVideo from '@/services/can-use-video'

import AwardType from '../award-type'

import style from './style'

class CustomizeAward extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedAwardType: 0,
      title: '',
      inscription: '',
      recipient: '',
      recipientError: null,
      canUseVideo: null,
      showVideo: false,
      showQrDropdown: false,
      waitingForPurchase: false,
      errorMessage: '',
      recipientFrozen: false
    }
    this.onCode = this.onCode.bind(this)
    this.boughtAwardSubscriber = new BoughtAwardSubscriber(() => this.setState({waitingForPurchase: false}))
  }

  awardId () {
    return this.props.match.params.awardId
  }

  componentDidMount () {
    this.initializeEdit()

    canUseVideo().then((result) => {
      this.setState({ canUseVideo: result })
    })
  }

  initializeEdit() {
    var awardId = this.awardId()

    if (awardId.length > 0) {
      getAward(awardId).then((values) => {
        this.setState({
          type: values[0],
          title: values[1],
          inscription: values[2],
          recipient: values[3],
          recipientFrozen: (values[3].length > 0) ? true : false
        })
      })
    }
  }

  componentWillUnmount() {
    this.boughtAwardSubscriber.stop()
  }

  onCode (address) {
    if (address.indexOf('0x') !== -1) {
      address = address.slice(address.indexOf('0x'))
      this.setState({recipient: address, recipientError: '', showVideo: false})
    }
  }

  onClickBuy () {
    if (!web3.isAddress(this.state.recipient)) {
      this.setState({ recipientError: 'Please enter a valid address' })
    } else {
      buyAward(this.state.selectedAwardType, this.state.title, this.state.inscription, this.state.recipient)
        .then((transaction) => {
          this.setState({waitingForPurchase: true})
        })
        .catch((error) => {
          this.setState({errorMessage: error})
        })
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

    var qrReaderButton =
      <button className='button is-primary' disabled>
        <FontAwesome name='qrcode' />
      </button>

    if (this.state.canUseVideo === true) {
      qrReaderButton =
        <div className={classnames('dropdown', { 'is-active': this.state.showQrDropdown })}>
          <div className="dropdown-trigger">
            <button
              className='button is-primary'
              onClick={() => this.setState({ showQrDropdown: !this.state.showQrDropdown })}
              onBlur={() => this.setTimeout(() => this.setState({showQrDropdown: false}), 100)}>
              <FontAwesome name='qrcode' />&nbsp;<FontAwesome name='angle-down' />
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a href="#" className="dropdown-item" onClick={() => this.setState({ showVideo: true, showQrDropdown: false, recipientError: '' })}>
                <FontAwesome name='video' /> Camera
              </a>
              <QrReaderImage
                onStart={() => this.setState({ showQrDropdown: false, recipientError: '' })}
                onCode={this.onCode}
                onError={(error) => this.setState({ recipientError: error})}
                isError={!!this.state.recipientError}>
                <a className="dropdown-item">
                  <FontAwesome name='camera' /> Photo
                </a>
              </QrReaderImage>
            </div>
          </div>
        </div>

    } else if (this.state.canUseVideo === false) {
      qrReaderButton =
        <QrReaderImage
          onStart={() => this.setState({ recipientError: '' })}
          onCode={this.onCode}
          onError={(error) => this.setState({ recipientError: error})}
          isError={!!this.state.recipientError} />
    }

    if (this.state.recipientFrozen) {
      qrReaderButton = <span />
    }


    if (this.state.showVideo === true) {
      var qrReaderWebrtc =
        <div className="card">
          <header className='card-header'>
            <p className="card-header-title">
            </p>
            <a className='card-header-icon' onClick={() => this.setState({ showVideo: false })}>
              <FontAwesome name='times' />
            </a>
          </header>
          <div className='card-content'>
            <QrReaderWebrtc onCode={this.onCode} />
          </div>
        </div>
    }

    if (this.state.errorMessage) {
      var errorMessage = <p className='help is-danger'>{this.state.errorMessage}</p>
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
                        <div key={index} className="column rotate-in-center is-one-fifth-mobile is-one-fifth-tablet is-one-fifth-desktop">
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
                        placeholder="What this award's for (ie. 2018 Award for Excellence)"
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
                      <div className="field has-addons">
                        <div className='control is-expanded'>
                          <input
                            disabled={this.state.recipientFrozen}
                            placeholder="0xffffffffffffffffffffffffffffffff"
                            type='text'
                            maxLength='42'
                            size='64'
                            className={classnames("input", { 'is-danger': !!recipientError })}
                            value={this.state.recipient}
                            onChange={(e) => this.setState({ recipient: e.target.value, recipientError: '' })} />
                        </div>
                        <div className='control'>
                          {qrReaderButton}
                        </div>
                      </div>
                    </div>
                    {recipientError}
                  </div>

                  {qrReaderWebrtc}

                  <br />
                  <p>
                    <button
                      disabled={this.state.selectedTrophy === null && !this.state.waitingForPurchase}
                      className={classnames('button is-primary is-medium', { 'is-loading': this.state.waitingForPurchase })}
                      onClick={(e) => this.onClickBuy()}>
                      Buy Award
                    </button>
                  </p>
                  {errorMessage}
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

reactMixin(CustomizeAward.prototype, TimerMixin)

export default CustomizeAward
