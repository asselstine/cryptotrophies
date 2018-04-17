// With code taken from jsQR library demo

import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import QrReaderWebrtc from './qr-reader-webrtc'
import QrReaderImage from './qr-reader-image'

class QrReader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      useMediaDevices: false
    }
  }

  componentDidMount () {
    if (!window.navigator || !window.navigator.mediaDevices) {
      this.setState({ useMediaDevices: false })
    }
    else {
      window.navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          this.setState({ useMediaDevices: true })
        })
        .catch((error) => {
          this.setState({ useMediaDevices: false })
        })
    }
  }

  render () {
    var component
    if (this.state.useMediaDevices) {
      component = <QrReaderWebrtc onAddress={this.props.onAddress} />
    } else {
      component = <QrReaderImage onAddress={this.props.onAddress} />
    }
    return component
  }
}

QrReader.propTypes = {
  onAddress: PropTypes.func.isRequired
}

export default QrReader
