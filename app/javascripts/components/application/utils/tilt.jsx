import React, {
  Component
} from 'react'

import VanillaTilt from 'vanilla-tilt';

export class Tilt extends Component {

  componentDidMount() {
    VanillaTilt.init(this.rootNode)
    console.log(this.rootNode)
  }

  render () {
    <div data-tilt ref={node => (this.rootNode = node)} className="tilt-root">
      <div className="tilt-child">
        <div {...this.props} />
      </div>
    </div>
  }

}
