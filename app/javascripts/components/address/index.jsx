import React, {
  Component
} from 'react'
import {
  addressOrBlankString
} from '@/helpers/address-helpers'
import PropTypes from 'prop-types'

require('./address.scss')

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
    let address = addressOrBlankString(this.props.address)

    if (this.state.showFull) {
      var displayed =
        <span className='tag address__full'>{address}</span>
    }
    else
    {
      displayed = <span onClick={() => this.toggleFull()} className="address__short">
        {address.substring(0, 6)}...
      </span>
    }
    return (
      <span title={address} className='address'>
        {displayed}
      </span>
    )
  }
}

Address.propTypes = {
  toggleFull: PropTypes.bool,
  address: PropTypes.any
}

Address.defaultProps = {
  toggleFull: true
}
