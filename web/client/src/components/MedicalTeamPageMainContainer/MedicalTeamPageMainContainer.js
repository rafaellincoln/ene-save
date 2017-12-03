import React from 'react'
import {
  TextField,
//   RadioButtonGroup,
//   RadioButton,
 } from 'material-ui'
import PropTypes from 'prop-types'
import style from './MedicalTeamPageMainContainer.css'
import ContentTitle from '../ContentTitle/ContentTitle'
import ContentSubtitle from '../ContentSubtitle/ContentSubtitle'

const styles = {}

class MedicalTeamPageMainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.renderButton = this.renderButton.bind(this)
  }
  componentWillMount() {
  }

  renderButton() {
    if (!this.props.hasButton) { return null }
    return (
      <div className="Grid-cell u-size3of12">
        <button onClick={this.props.onClick}>Salvar</button>
      </div>
    )
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
            name="comments"
            floatingLabelText="Observações"
            fullWidth
            multiLine
            rows={2}
            rowsMax={4}
            onChange={this.handleChange}
          />
          <div className="Grid-cell u-size1of12" />
        </div>
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell u-size11of12"></div>
        <div className="Grid-cell u-size11of12">
          <div style={styles.alignDiv}>
            <button style={styles.buttonSend} onClick={this.props.onClick}>Salvar</button>
          </div>
        </div>
      </div>
    )
  }
}

styles.alignDiv = {
  textAlign: 'right',
  color: '#ffffff',
}

styles.buttonSend = {
  marginTop: '40px',
  width: '178px',
  height: '46px',
  borderRadius: '100px',
  backgroundColor: '#29c94c',
  boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.04)',
  border: 'solid 1px #1b9a37',
}

export default MedicalTeamPageMainContainer
