import React from 'react'
import PropTypes from 'prop-types'
import style from './ContentTitle.css'

class ContentSubtitle extends React.Component {
  constructor(props) {
    super(props)
    this.renderButton = this.renderButton.bind(this)
  }

  renderButton() {
    return (
      <div className="Grid-cell u-size3of12">
        <button onClick={this.props.onClick}>Salvar</button>
      </div>
    )
  }

  render() {
    return (
      <div className={`Grid Grid--withGutter Grid--alignMiddle ${style.container}`}>
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell u-size7of12">
          <h2>{this.props.title}</h2>
        </div>
        {this.renderButton()}
        <div className="Grid-cell u-size1of12" />
      </div>
    )
  }
}

ContentSubtitle.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
}

export default ContentSubtitle
