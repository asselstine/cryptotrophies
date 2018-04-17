// With code taken from jsQR library demo

import React, {
  Component
} from 'react'
import reactMixin from 'react-mixin'
import PropTypes from 'prop-types'
import jsQR from "jsqr"

class QrReaderWebrtc extends Component {
  constructor (props) {
    super(props)
    this.tick = this.tick.bind(this)
    this.videoRef = this.videoRef.bind(this)
    this.state = {
      loadingMessage: 'Unable to access video stream (please make sure you have a webcam enabled)',
      outputMessage: ''
    }
  }

  videoRef (ref) {
    this.videoElement = ref
    if (ref === null) return
    window.navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
      this.videoElement.srcObject = stream;
      this.videoElement.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      this.videoElement.play();
      requestAnimationFrame(this.tick)
    })
  }

  componentWillUnmount () {
    if (this.videoElement) {
      this.videoElement.srcObject.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }

  drawLine (begin, end, color) {
    this.canvas.beginPath()
    this.canvas.moveTo(begin.x, begin.y)
    this.canvas.lineTo(end.x, end.y)
    this.canvas.lineWidth = 4
    this.canvas.strokeStyle = color
    this.canvas.stroke()
  }

  tick () {
    this.setState({ loadingMessage: 'Loading video...' })
    if (this.videoElement.readyState !== this.videoElement.HAVE_ENOUGH_DATA || !this.canvasElement) {
      requestAnimationFrame(this.tick);
      return
    }
    this.setState({ loadingMessage: 'Point camera at QR code' })
    this.canvasElement.height = this.videoElement.videoHeight;
    this.canvasElement.width = this.videoElement.videoWidth;
    this.canvas.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
    var imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
      this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
      this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
      this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
      if (code.data.indexOf('0x') !== -1) {
        this.props.onAddress(code.data)
      } else {
        requestAnimationFrame(this.tick);
      }
    } else {
      requestAnimationFrame(this.tick);
    }
  }

  render () {
    if (this.state.loadingMessage) {
      var loadingMessage = <div>{this.state.loadingMessage}</div>
    }
    if (this.state.outputMessage) {
      var outputMessage =
        <div>
          <div><b>Data:</b> {this.state.outputMessage}</div>
        </div>
    }
    return (
      <div className='qr-reader'>
        <video ref={this.videoRef} hidden />
        {loadingMessage}
        <canvas ref={(ref) => {
          if (ref !== null) {
            this.canvasElement = ref
            this.canvas = ref.getContext('2d')
          } else {
            this.canvasElement = null
            this.canvas = null
          }
        }} hidden></canvas>
        {outputMessage}
      </div>
    )
  }
}

QrReaderWebrtc.propTypes = {
  onAddress: PropTypes.func.isRequired
}

export default QrReaderWebrtc
