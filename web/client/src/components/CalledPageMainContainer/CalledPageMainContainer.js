import React from 'react'
import {
  TextField,
  RadioButtonGroup,
  RadioButton,
} from 'material-ui'
import style from './CalledPageMainContainer.css'
import ContentSubtitle from '../ContentSubtitle/ContentSubtitle'
import ContentTitle from '../ContentTitle/ContentTitle'

const styles = {}

class CalledPageMainContainer extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className={`Grid Grid--withGutter Grid--alignMiddle ${style.mainContainer}`}>
        <div className="Grid-cell">
          <ContentTitle title="Cadastro do chamado" hasButton />
        </div>
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell u-size10of12">
          <div className="Grid Grid--withGutter Grid--alignMiddle">
            <div className="Grid-cell">
              <ContentSubtitle title="Dados do contribuinte" />
            </div>
            <div className="Grid-cell u-size8of12">
              <TextField
                floatingLabelText="Nome do colaborador"
                fullWidth
              />
            </div>
            <div className="Grid-cell u-size4of12">
              <TextField
                floatingLabelText="Telefone"
                fullWidth
              />
            </div>
            <div className="Grid-cell">
              <ContentSubtitle title="Local do Acidente" />
            </div>
            <div className="Grid-cell">
              <div className="Grid Grid--withGutter Grid--alignMiddle">
                <div className="Grid-cell u-size6of12">
                  <TextField
                    floatingLabelText="Municipio"
                    fullWidth
                  />
                </div>
                <div className="Grid-cell u-size8of12">
                  <TextField
                    floatingLabelText="Endereço"
                    fullWidth
                  />
                </div>
                <div className="Grid-cell u-size4of12">
                  <TextField
                    floatingLabelText="Número"
                    fullWidth
                  />
                </div>
                <div className="Grid-cell u-size4of12">
                  <TextField
                    floatingLabelText="Bairro"
                    fullWidth
                  />
                </div>
                <div className="Grid-cell u-size8of12">
                  <TextField
                    floatingLabelText="Referência"
                    fullWidth
                  />
                </div>
                <div className="Grid-cell">
                  <ContentSubtitle title="Dados da vítima" />
                </div>
                <div className="Grid-cell u-size8of12">
                  <TextField
                    floatingLabelText="Nome da Vítima"
                    fullWidth
                  />
                </div>
                <div className="Grid-cell u-size4of12">
                  <RadioButtonGroup name="gender" defaultSelected="M">
                    <RadioButton
                      value="M"
                      label="Masculino"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="F"
                      label="Feminino"
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
                </div>
                <div className="Grid-cell">
                  <TextField
                    floatingLabelText="Queixa da vítima"
                    fullWidth
                    multiLine
                    rows={2}
                    rowsMax={4}
                  />
                </div>
                <div className="Grid-cell u-size4of12">
                  <RadioButtonGroup name="medica-emergency" defaultSelected="N" style={styles.radioButtonGroup}>
                    <RadioButton
                      value="N"
                      label="Não"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="S"
                      label="Sim"
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
                </div>
                <div className="Grid-cell">
                  <TextField
                    floatingLabelText="Observação"
                    fullWidth
                    multiLine
                    rows={2}
                    rowsMax={4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default CalledPageMainContainer
