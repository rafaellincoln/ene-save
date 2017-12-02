import React from 'react'
import {
  TextField,
  RadioButtonGroup,
  RadioButton,
  AutoComplete,
} from 'material-ui'
import request from 'superagent'
import urls from '../../../../server/constant/urls'
import style from './CalledPageMainContainer.css'
import ContentSubtitle from '../ContentSubtitle/ContentSubtitle'
import ContentTitle from '../ContentTitle/ContentTitle'

const styles = {}

const city = [
  'Uberlândia',
  'Ituiutaba',
  'Araguari',
  'Capinópolis',
  'Patos de Minas',
  'Campina Verde',
]

class CalledPageMainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gender: 'M',
      emergency: 'N',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOnNewRequest = this.handleOnNewRequest.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleChange(ev, newValue) {
    const newState = {
      [ev.target.name]: newValue,
    }
    this.setState(newState)
  }

  handleOnNewRequest(value) {
    this.setState({
      city: value,
    })
  }

  handleSave() {
    if (this.state) {
      request
        .post(`${urls.baseURL}/occurrence`)
        .send(this.state)
        .end((err, res) => {
          console.log('err: ', err)
          console.log('res: ', res)
        })
    }
  }

  render() {
    return (
      <div className={`Grid Grid--withGutter Grid--alignMiddle ${style.mainContainer}`}>
        <div className="Grid-cell">
          <ContentTitle title="Cadastro do chamado" hasButton onClick={this.handleSave} />
        </div>
        <div className="Grid-cell u-size1of12" />
        <div className="Grid-cell u-size10of12">
          <div className="Grid Grid--withGutter Grid--alignMiddle">
            <div className="Grid-cell">
              <ContentSubtitle title="Dados do contribuinte" />
            </div>
            <div className="Grid-cell u-size8of12">
              <TextField
                name="name_solicitant"
                floatingLabelText="Nome do colaborador"
                fullWidth
                onChange={this.handleChange}
              />
            </div>
            <div className="Grid-cell u-size4of12">
              <TextField
                name="phone"
                floatingLabelText="Telefone"
                fullWidth
                onChange={this.handleChange}
              />
            </div>
            <div className="Grid-cell">
              <ContentSubtitle title="Local do Acidente" />
            </div>
            <div className="Grid-cell">
              <div className="Grid Grid--withGutter Grid--alignMiddle">
                <div className="Grid-cell u-size6of12">
                  <AutoComplete
                    name="city"
                    floatingLabelText="Município"
                    fullWidth
                    filter={AutoComplete.caseInsensitiveFilter}
                    onUpdateInput={this.handleOnNewRequest}
                    onNewRequest={this.handleOnNewRequest}
                    dataSource={city}
                  />
                </div>
                <div className="Grid-cell u-size8of12">
                  <TextField
                    name="address"
                    floatingLabelText="Endereço"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </div>
                <div className="Grid-cell u-size4of12">
                  <TextField
                    name="number_address"
                    floatingLabelText="Número"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </div>
                <div className="Grid-cell u-size4of12">
                  <TextField
                    name="neighborhood"
                    floatingLabelText="Bairro"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </div>
                <div className="Grid-cell u-size8of12">
                  <TextField
                    name="complement"
                    floatingLabelText="Complemento"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </div>
                <div className="Grid-cell u-size4of12">
                  <TextField
                    name="reference_address"
                    floatingLabelText="Referência"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </div>
                <div className="Grid-cell">
                  <ContentSubtitle title="Dados da vítima" />
                </div>
                <div className="Grid-cell u-size8of12">
                  <TextField
                    name="name_patient"
                    floatingLabelText="Nome da Vítima"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </div>
                <div className="Grid-cell u-size4of12">
                  <p>Sexo da Vítima</p>
                  <RadioButtonGroup name="gender" defaultSelected="M" onChange={this.handleChange}>
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
                    name="complaint_patient"
                    floatingLabelText="Queixa da vítima"
                    fullWidth
                    multiLine
                    rows={2}
                    rowsMax={4}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="Grid-cell u-size4of12">
                  <p style={{ marginTop: 10 }}>É uma emergência médica?</p>
                  <RadioButtonGroup
                    name="emergency"
                    defaultSelected="N"
                    style={styles.radioButtonGroup}
                    onChange={this.handleChange}
                  >
                    <RadioButton
                      value="N"
                      label="Não"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="Y"
                      label="Sim"
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
                </div>
                <div className="Grid-cell">
                  <TextField
                    name="comments"
                    floatingLabelText="Observação"
                    fullWidth
                    multiLine
                    rows={2}
                    rowsMax={4}
                    onChange={this.handleChange}
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
