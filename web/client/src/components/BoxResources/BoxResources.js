import React from 'react'
import PropTypes from 'prop-types'
import style from './BoxResources.css'

class BoxResources extends React.Component {
  componentWillMount() {}

  render() {
    return (
      <div className={`Grid Grid--alignMiddle Grid--withGutter ${style.boxListResources}`}>
        <div className="Grid-cell u-size6of12">
          <p>{this.props.car}</p>
        </div>
        <div className="Grid-cell u-size6of12">
          <p>{this.props.button}</p>
        </div>
      </div>
    )
  }
}

BoxResources.propTypes = {
  car: PropTypes.string,
  button: PropTypes.number,
}

export default BoxResources
