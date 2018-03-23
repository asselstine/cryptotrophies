import React, {
  Component
} from 'react'
import classnames from 'classnames'

import style from './style'

export default class extends Component {
  render () {
    return (
      <div
        className={classnames('trophy-item', { 'selected': this.props.selected })}
        onClick={this.props.onClick}>
        <img src={this.props.url} className='trophy-item__img' />
      </div>
    )
  }
}
