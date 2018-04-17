import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import jsQR from "jsqr"

require('./style')

class QrReaderImage extends Component {
  onChangeFile (event) {
    this.props.onStart()
    var input = event.target
    if (input.files && input.files[0]) {
      var reader = new FileReader()
      reader.onload = (e) => {
        var img = new Image()
        img.onload = () => {
          var ratio = img.height / img.width
          var maxWidth = 768
          this.canvasElement.height = Math.min(maxWidth * ratio, img.height)
          this.canvasElement.width = Math.min(maxWidth, img.width)
          this.canvas.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height)
          var imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height)
          var code = jsQR(imageData.data, this.canvasElement.width, this.canvasElement.height)
          if (code) {
            this.props.onCode(code.data)
          } else {
            this.props.onError('No QR code found.')
          }
        };
        img.src = e.target.result
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  render () {
    var children = this.props.children || (
      <a className={this.props.className}>
        <FontAwesome name='camera' />
      </a>
    )
    return (
      <div>
        <label htmlFor='qrImage' className={classnames({ 'is-error': this.props.isError })}>
          {children}
        </label>
        <input
          style={{opacity: 0}}
          id='qrImage'
          type='file'
          accept='image/*;capture=camera'
          className='qr-reader-image__input'
          onChange={(e) => this.onChangeFile(e)} />
        <canvas ref={(ref) => {
          if (ref !== null) {
            this.canvasElement = ref
            this.canvas = ref.getContext('2d')
          } else {
            this.canvasElement = null
            this.canvas = null
          }
        }} hidden></canvas>
      </div>
    )
  }
}

QrReaderImage.propTypes = {
  onStart: PropTypes.func.isRequired,
  onCode: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any
}

QrReaderImage.defaultProps = {
  className: 'button is-primary'
}

export default QrReaderImage
