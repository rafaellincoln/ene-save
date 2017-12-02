import React from 'react'
// import {
//   TextField,
//   RadioButtonGroup,
//   RadioButton,
// } from 'material-ui'
import PropTypes from 'prop-types'
import style from './OcurrencePageMainContainer.css'
// import ContentSubtitle from '../ContentSubtitle/ContentSubtitle'
import ContentTitle from '../ContentTitle/ContentTitle'
import Map from '../Map/Map'

const styles = {}

class OcurrencePageMainContainer extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className={`Grid Grid--withGutter Grid--alignMiddle ${style.mainContainer}`}>
        <div className="Grid-cell">
          <ContentTitle title="Despacho" />
        </div>
        <div className="Grid-cell u-size1of12" />
        <div className={`Grid-cell u-size10of12 ${style.containerMap}`}>
          <Map />
        </div>
        <div className="Grid-cell u-size1of12" />
      </div>
    )
  }
}

OcurrencePageMainContainer.propTypes = {
  isMarkerShown: PropTypes.bool,
}

styles.radioButton = {
  display: 'inline-block',
  marginRight: '10px',
  width: 'auto',
}

styles.radioButtonGroup = {
  marginTop: 10,
}

export default OcurrencePageMainContainer
