import React from 'react'
import PropTypes from 'prop-types'
import style from './BoxOccurrences.css'

class BoxOccurrences extends React.Component {
  componentWillMount() {}

  render() {
    return (
      <div className={style.box}>
        <p className={style.name}>{this.props.name}</p>
        <div className="Grid">
          <div className="Grid-cell u-size4of12">
            <p>{this.props.text}</p>
          </div>
          <div className="Grid-cell u-size3of12">
            <p>{this.props.date}</p>
          </div>
          <div className="Grid-cell u-size3of12">
            colocar botões
          </div>
          <div className="Grid-cell u-size2of12">
            <p>{this.props.status}</p>
          </div>
        </div>
      </div>
    )
  }
}

BoxOccurrences.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.number,
}

export default BoxOccurrences
