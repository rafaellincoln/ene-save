import React from 'react'
import PropTypes from 'prop-types'
import style from './ContentSubtitle.css'

class ContentSubtitle extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <h3 className={style.title}>{this.props.title}</h3>
    )
  }
}

ContentSubtitle.propTypes = {
  title: PropTypes.string,
}

export default ContentSubtitle
