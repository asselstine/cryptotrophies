import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
require('./address.css')

export const Address = class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showFull: false
    }
  }

  toggleFull () {
    if (this.props.toggleFull) {
      this.setState({ showFull: !this.state.showFull })
    }
  }

  render () {
    if (this.props.address) {
      var address = this.props.address.toString()
    } else {
      address = ''
    }
    if (this.state.showFull) {
      var full =
        <span onClick={() => this.toggleFull()} className='tag address_full'>{address}</span>
    }
    return (
      <span onClick={() => this.toggleFull()} title={address} className='address'>
        {full}
        {address.substring(0, 6)}...
      </span>
    )
  }
}

Address.propTypes = {
  toggleFull: PropTypes.bool
}

Address.defaultProps = {
  toggleFull: true
}
