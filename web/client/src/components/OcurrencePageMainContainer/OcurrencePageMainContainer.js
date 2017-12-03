import React from 'react'
import PropTypes from 'prop-types'
import request from 'superagent'
import moment from 'moment'
import style from './OcurrencePageMainContainer.css'
import ContentTitle from '../ContentTitle/ContentTitle'
import Map from '../Map/Map'
import BoxOccurrences from '../BoxOccurrences/BoxOccurrences'
import BoxResources from '../BoxResources/BoxResources'
import urls from '../../../../server/constant/urls'

const styles = {}

class OcurrencePageMainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      occurrences: [],
      resources: [],
    }
    this.renderBoxOccurrences = this.renderBoxOccurrences.bind(this)
  }

  componentWillMount() {
    request
      .get(`${urls.baseURL}/occurrence`)
      .end((err, res) => {
        if (err) {
          console.log('ERRO: ', err)
        }
        this.setState({ occurrences: res.body })
      })

    request
      .get(`${urls.baseURL}/resource`)
      .end((err, res) => {
        if (err) {
          console.log('ERRO: ', err)
        }
        this.setState({ resources: res.body })
      })
  }

  renderBoxOccurrences() {
    if (this.state.occurrences.length) {
      return this.state.occurrences.map((item) => {
        const date = moment(item.status.length ? item.status[0].date : null).format('DD-MM-YYYY')
        return (
          <BoxOccurrences
            key={item.id_occurrence}
            name={item.name_solicitant}
            text={item.comments}
            date={date}
            status={item.status.length ? item.status[(item.status.length - 1)].type : null}
          />
        )
      })
    }

    return null
  }

  renderListResources() {
    if (this.state.resources.length) {
      return this.state.resources.map(item => (
        <BoxResources
          key={item.id_resource}
          car={`Viatura Placa ${item.board_resource}`}
          button={item.status_resource}
        />
      ))
    }

    return null
  }

  render() {
    return (
      <div className={`Grid Grid--withGutter Grid--alignMiddle ${style.mainContainer}`}>
        <div className="Grid-cell">
          <ContentTitle title="Despacho" />
        </div>
        <div className="Grid-cell u-size1of12" />
        <div className={`Grid-cell u-size10of12 ${style.containerMap}`}>
          <div className="Grid Grid--withGutter Grid--aligMiddle">
            <div className={`Grid-cell ${style.boxListOccurrences}`}>
              <Map
                occurrences={this.state.occurrences}
                resources={this.state.resources}
              />
            </div>
            <div className="Grid-cell">
              <div className="Grid Grid--withGutter">
                <div className="Grid-cell u-size7of12">
                  <h3 className={style.subtitle}>Últimas Ocorrências</h3>
                  <div className="Grid">
                    <div className="Grid-cell u-size4of12">
                      <p>Observação</p>
                    </div>
                    <div className="Grid-cell u-size3of12">
                      <p>Criado em</p>
                    </div>
                    <div className="Grid-cell u-size3of12">
                      <p>Ações</p>
                    </div>
                    <div className="Grid-cell u-size2of12">
                      <p>Status</p>
                    </div>
                  </div>
                </div>
                <div className="Grid-cell u-size5of12">
                  <h3 className={style.subtitle}>Lista de Recursos</h3>
                  <div className="Grid">
                    <div className="Grid-cell u-size6of12">
                      <p>Recurso</p>
                    </div>
                    <div className="Grid-cell u-size6of12">
                      <p>Status</p>
                    </div>
                  </div>
                </div>
                <div className="Grid-cell u-size7of12">
                  {this.renderBoxOccurrences()}
                </div>
                <div className="Grid-cell u-size5of12">
                  {this.renderListResources()}
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
