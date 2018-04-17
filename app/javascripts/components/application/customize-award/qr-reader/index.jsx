// With code taken from jsQR library demo

import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import QrReaderImage from './qr-reader-image'

class QrReader extends Component {

  componentDidMount () {
    window.navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        alert('Found stream', stream)
      })
      .catch((error) => {
        alert(error)
      })
  }

  render () {
    return <QrReaderImage onAddress={this.props.onAddress} />
  }
}

QrReader.propTypes = {
  onAddress: PropTypes.func.isRequired
}

export default QrReader
