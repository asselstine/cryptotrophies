import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import { Ether } from '../../ether'
import { connect } from 'react-redux'
import retrieveBlock from '../../../services/retrieve-block'

export const EventRow = connect(
  (state, ownProps) => {
    return {
      block: state.blocks[ownProps.event.blockHash]
    }
  }
)(class extends Component {
  componentDidMount () {
    retrieveBlock(this.props.event.blockHash)
  }

  render () {
    if (this.props.block) {
      var date = new Date(this.props.block.timestamp * 1000)
      var dateString = date.toString()
    }

    return (
      <tr key={this.props.event.logIndex}>
        <td>{dateString}</td>
        <td>{this.props.event.event}</td>
        <td><Ether wei={this.props.event.args.amount} /></td>
      </tr>
    )
  }
})

EventRow.propTypes = {
  event: PropTypes.object.isRequired,
  block: PropTypes.object
}
