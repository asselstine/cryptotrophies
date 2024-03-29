import React, {
  Component
} from 'react'

import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'

import {
  Tooltip,
} from 'react-tippy';

import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import range from 'lodash.range'
import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'

import QrReaderWebrtc from './qr-reader-webrtc'
import QrReaderImage from './qr-reader-image'

import BoughtAwardSubscriber from '@/subscribers/bought-award-subscriber'
import UpdatedAwardSubscriber from '@/subscribers/updated-award-subscriber'

import awardTypeImageUrlService from '@/services/award-type-image-url'
import canUseVideoService from '@/services/can-use-video'
import buyAwardService from '@/services/buy-award'
import getAwardService from '@/services/get-award'
import updateAwardService from '@/services/update-award'

import AwardType from '../award-type'

import style from './style'

class CustomizeAward extends Component {

  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      awardId: -1,
      type: 0,
      title: '',
      inscription: '',
      recipient: '',
      recipientError: null,
      canUseVideo: null,
      showVideo: false,
      showQrDropdown: false,
      waitingForEthNetwork: false,
      errorMessage: '',
      animateRecipient: false,
      animateInscription: false,
      showInscription: false
    }

    this.initialAwardState = {}

    this.onCode = this.onCode.bind(this)
  }

  awardId () {
    return this.props.match.params.awardId
  }

  componentDidMount () {
    if (this.awardId() && this.awardId().length > 0) {
      this.setState({
        isEditing: true
      }, this.initializeEdit());

      this.updatedAwardSubscriber = new UpdatedAwardSubscriber(() => this.setState({waitingForEthNetwork: false}))
    }
    else {
      this.boughtAwardSubscriber = new BoughtAwardSubscriber(() => this.setState({waitingForEthNetwork: false}))
    }

    canUseVideoService().then((result) => {
      this.setState({ canUseVideo: result })
    })
  }

  initializeEdit() {
    getAwardService(this.awardId()).then((values) => {
      let recipientAddress = (web3.toBigNumber(values[3]).isZero()) ? '' : values[3]
      this.setState({
        awardId: this.awardId(),
        type: values[0],
        title: values[1],
        inscription: values[2],
        recipient: recipientAddress,
        animateRecipient: (recipientAddress.length > 0) ? true : false,
        animateInscription: (values[2].length > 0) ? true : false
      })

      this.initialAwardState = {
        type: values[0],
        title: values[1],
        inscription: values[2],
        recipient: recipientAddress
      }
    }).catch((error) => {
      console.error(error)
      this.props.history.goBack();
    })
  }

  componentWillUnmount() {
    if (this.state.isEditing) {
      this.updatedAwardSubscriber.stop()
    }
    else {
      this.boughtAwardSubscriber.stop()
    }
  }

  onCode (address) {
    if (address.indexOf('0x') !== -1) {
      address = address.slice(address.indexOf('0x'))
      this.setState({ recipient: address, recipientError: '', showVideo: false })
    }
  }

  onClickRetainOwnership = (e) => {
    this.setState({
      animateRecipient: false
    })
  }

  onClickIssueToRecipient = (e) => {
    this.setState({
      animateRecipient: true
    })
  }

  onClickWriteInscription = (e) => {
    this.setState({
      animateInscription: true
    })
  }

  onClickSave () {
    if (this.state.recipient.length > 0 && !web3.isAddress(this.state.recipient)) {
      this.setState({ recipientError: 'Please enter a valid Ethereum wallet address' })
      return;
    } else {
      if (this.state.isEditing) {
        let recipientAddress = (this.state.recipient.length > 0) ? this.state.recipient : 0
        updateAwardService(
          this.state.awardId,
          this.state.type,
          this.state.title,
          this.state.inscription,
          recipientAddress
        )
          .then((transaction) => {
            this.setState({ waitingForEthNetwork: true })
          })
          .catch((error) => {
            this.setState({ errorMessage: error.message })
          })
      }
      else
      {
        let recipientAddress = (this.state.recipient.length > 0) ? this.state.recipient : 0
        buyAwardService(
          this.state.type,
          this.state.title,
          this.state.inscription,
          recipientAddress
        ).then((transaction) => {
            this.setState({ waitingForEthNetwork: true })
          })
         .catch((error) => {
           this.setState({ errorMessage: error.message })
         })
      }
    }
  }

  onClickAwardType (index) {
    this.setState({ type: index })
  }

  sameAsInitialState() {
    return (
      this.initialAwardState.type == this.state.type
        && this.initialAwardState.title == this.state.title
        && this.initialAwardState.inscription == this.state.inscription
        && this.initialAwardState.recipient == this.state.recipient
    )
  }

  saveFormButtonDisabled () {
    if (this.state.isEditing) {
      return (
        this.sameAsInitialState() || this.state.waitingForEthNetwork
      )
    }
    else {
      return (this.state.waitingForEthNetwork)
    }
  }

  render () {
    if (this.state.type !== null) {
      var type =
        <img
          src={awardTypeImageUrlService(this.state.type)}
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

    if (this.state.isEditing && this.state.recipient.length > 0) {
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
                      var selected = this.state.type === index
                      return (
                        <div key={index} className="column flip-in-diag-2-br is-one-fifth-mobile is-one-fifth-tablet is-one-fifth-desktop">
                          <AwardType
                            url={awardTypeImageUrlService(index, 'small')}
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
                        placeholder="Purpose of award (eg. 2018 Innitech Award for Excellence)"
                        className="input"
                        value={this.state.title}
                        onChange={(e) => this.setState({ title: e.target.value })} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Inscription</label>

                    <CSSTransition
                      timeout={250}
                      classNames="scale-top"
                      unmountOnExit
                      in={!this.state.animateInscription}
                      onExited={() => { this.setState({ showInscription: true }); }}
                    >
                      <div>
                        <button
                          className="button"
                          onClick={this.onClickWriteInscription}>
                            Write an Inscription
                        </button>
                        <Tooltip
                          title="You can write an optional inscription with the award recipients name and any other info at a later date"
                          position="right"
                          trigger="mouseenter"
                        >
                          <p className="ivy-tooltip">
                            <i className="fas fa-xs fa-question"></i>
                          </p>
                        </Tooltip>
                      </div>
                    </CSSTransition>

                    <CSSTransition
                      timeout={250}
                      classNames="fade-bottom"
                      unmountOnExit
                      in={this.state.showInscription}
                      onEntered={() => {
                        if (!this.state.isEditing) this.inscriptionTextarea.focus()
                      }}
                    >
                      <div className="control">
                        <textarea
                          ref={(textarea) => { this.inscriptionTextarea = textarea; }}
                          placeholder="If you know the award recipient you can write their name and any other info here"
                          className="textarea"
                          value={this.state.inscription}
                          onChange={(e) => this.setState({ inscription: e.target.value })} />
                      </div>
                    </CSSTransition>
                  </div>


                  <div className="field">
                    <label className="label">Recipient</label>
                  </div>

                  <div className="buttons has-addons">
                    <button
                      onClick={this.onClickRetainOwnership}
                      disabled={this.state.isEditing && this.state.recipient.length > 0}
                      className={classnames("button", {
                        'is-selected': !this.state.animateRecipient,
                        'is-primary': !this.state.animateRecipient
                      })}>
                      Retain Ownership
                    </button>
                    <button
                      onClick={this.onClickIssueToRecipient}
                      className={classnames("button", {
                        'is-selected': this.state.animateRecipient,
                        'is-primary': this.state.animateRecipient
                      })}>
                      Issue to Recipient
                    </button>
                  </div>

                  <CSSTransition
                    timeout={250}
                    classNames="fade-bottom"
                    unmountOnExit
                    in={this.state.animateRecipient}
                    onEntered={() => {
                      if (!this.state.isEditing) this.recipientInput.focus()
                    }}
                  >
                    <div className="control">
                      <div className="field has-addons">
                        <div className='control is-expanded'>
                          <input
                            ref={(input) => { this.recipientInput = input; }}
                            disabled={this.state.isEditing && this.state.recipient.length > 0}
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

                      {recipientError}
                    </div>
                  </CSSTransition>

                  {qrReaderWebrtc}

                  <br />
                  <p>
                    <button
                      disabled={this.saveFormButtonDisabled()}
                      className={classnames('button is-primary is-medium', { 'is-loading': this.state.waitingForEthNetwork })}
                      onClick={(e) => this.onClickSave()}>
                      {this.state.isEditing ? 'Update Award' : 'Buy Award'}
                    </button>
                  </p>
                  {errorMessage}
                </div>
              </div>
            </div>

            <div className='column is-one-third'>
              {type}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

reactMixin(CustomizeAward.prototype, TimerMixin)

export default CustomizeAward
