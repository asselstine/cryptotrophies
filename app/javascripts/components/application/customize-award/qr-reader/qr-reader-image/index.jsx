import React, {
  Component
} from 'react'
import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import jsQR from "jsqr"

require('./style')

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: ''
    }
  }

  onChangeFile (event) {
    this.setState({ errorMessage: '' })
    var input = event.target
    if (input.files && input.files[0]) {
      var reader = new FileReader()
      reader.onload = (e) => {
        var img = new Image()
        img.onload = () => {
          this.canvasElement.height = img.height;
          this.canvasElement.width = img.width;
          this.canvas.drawImage(img,0,0)
          var imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height)
          var code = jsQR(imageData.data, imageData.width, imageData.height)
          if (code && code.data.indexOf('0x') !== -1) {
            this.props.onAddress(code.data)
          } else {
            this.setState({ errorMessage: 'No QR code found in image.' })
          }
        };
        img.src = e.target.result
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  render () {
    if (this.state.errorMessage) {
      var errorMessage =
        <p className="help is-danger">{this.state.errorMessage}</p>
    }
    return (
      <div>
        <label htmlFor='qrImage' className={classnames('button is-primary', { 'is-error': !!errorMessage })}>
          <FontAwesome name='camera' />
        </label>
        {errorMessage}
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
        }}></canvas>
      </div>
    )
  }
}
