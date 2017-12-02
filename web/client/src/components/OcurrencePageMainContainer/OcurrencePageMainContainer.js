import React from 'react'
// import {
//   TextField,
//   RadioButtonGroup,
//   RadioButton,
// } from 'material-ui'
import style from './OcurrencePageMainContainer.css'
// import ContentSubtitle from '../ContentSubtitle/ContentSubtitle'
import ContentTitle from '../ContentTitle/ContentTitle'

const styles = {}

class OcurrencePageMainContainer extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className={`Grid Grid--withGutter Grid--alignMiddle ${style.mainContainer}`}>
        <div className="Grid-cell">
          <ContentTitle title="Ocorrências" hasButton />
        </div>
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell u-size10of12" />
        <div className="Grid-cell u-size1of12" />
      </div>
    )
  }
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
