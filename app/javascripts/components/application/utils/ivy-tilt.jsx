import React, {
  Component
} from 'react'

import VanillaTilt from 'vanilla-tilt';

export default class extends Component {

  componentDidMount() {
    VanillaTilt.init(this.rootNode)
  }

  render () {
    return (
      <div
        data-tilt
        data-tilt-glare={true}
        data-tilt-scale="1.05"
        data-tilt-speed={2000}
        ref={node => (this.rootNode = node)}
        className="tilt-root">
        <div className="tilt-child">
          <div {...this.props} />
        </div>
      </div>
    )
  }

}
