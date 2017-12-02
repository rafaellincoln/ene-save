import React from 'react'
import {
  TextField,
//   RadioButtonGroup,
//   RadioButton,
 } from 'material-ui'
import style from './MedicalTeamPageMainContainer.css'
import ContentTitle from '../ContentTitle/ContentTitle'
import ContentSubtitle from '../ContentSubtitle/ContentSubtitle'

class MedicalTeamPageMainContainer extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className={`Grid Grid--withGutter Grid--alignMiddle ${style.mainContainer}`}>
        <div className="Grid-cell">
          <ContentTitle title="Equipe Médica" />
        </div>
        <div className={`Grid-cell u-size1of12 ${style.padding}`} />
        <div className="Grid-cell u-size10of12">
          <TextField
            name=""
            floatingLabelText="Dados"
            fullWidth
            onChange={this.handleChange}
          />
        </div>
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell u-size7of12">
          <TextField
            name=""
            floatingLabelText="Dados"
            fullWidth
            onChange={this.handleChange}
          />
        </div>
        <div className="Grid-cell u-size3of12">
          <TextField
            name=""
            floatingLabelText="Dados"
            fullWidth
            onChange={this.handleChange}
          />
        </div>
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell">
          <ContentSubtitle title="Local do Acidente" />
        </div>
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell u-size10of12">
          <TextField
            name=""
            floatingLabelText="Dados"
            fullWidth
            onChange={this.handleChange}
          />
        </div>
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell u-size10of12">
          <TextField
            name="comments"
            floatingLabelText="Dados"
            fullWidth
            multiLine
            rows={2}
            rowsMax={4}
            onChange={this.handleChange}
          />
          <div className="Grid-cell u-size1of12" />
        </div>
      </div>
    )
  }
}

export default MedicalTeamPageMainContainer
