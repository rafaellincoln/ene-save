import React from 'react'
import PropTypes from 'prop-types'
import {
  Map,
  Marker,
  GoogleApiWrapper,
  InfoWindow,
} from 'google-maps-react'
import { log } from 'util'
import moment from 'moment'
import request from 'superagent'
import style from './Map.css'
import urls from '../../../../server/constant/urls'

class MapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMarker: null,
      selectedPlace: null,
    }
    this.onMarkerClick = this.onMarkerClick.bind(this)
  }

  onMarkerClick(prop, mark, idOccurrence, resources) {
    this.setState({
      selectedPlace: prop,
      activeMarker: mark,
    })

    resources.map((item) => {
      const btn = document.querySelector(`button[data-sendresource="${idOccurrence}"]`)
      if (btn) {
        btn.addEventListener('click', () => {
          request
            .put(`${urls.baseURL}/occurrence/action`)
            .send({ id: idOccurrence, status: [{ type: 3, date: moment().format() }], resource: item.id_resource })
            .end((err, res) => {
              console.log('err: ', err)
              console.log('res: ', res)
            })
        })
      }
    })

  }

  renderMarker() {
    if (this.props.occurrences.length) {
      return this.props.occurrences.map((item) => {
        // if (item.status.length && (item.status[item.status.length - 1].type === 2)) {
        return (
          <Marker
            key={item.id_occurrence}
            position={{ lat: item.location.lat, lng: item.location.long }}
            icon={{
              url: '/images/marker.svg',
            }}
            onClick={(prop, mark) => this.onMarkerClick(prop, mark, item.id_occurrence, this.props.resources)}
          />
        )
        // }
        // return null
      })
    }
    return null
  }

  renderInfoWindow() {
    if (this.props.occurrences.length) {
      return this.props.occurrences.map((item) => {
        if (this.state.activeMarker &&
          ((this.state.activeMarker.position.lat() === item.location.lat) ||
          (this.state.activeMarker.position.lng() === item.location.long))) {
          return (
            <InfoWindow
              key={item.id_occurrence}
              marker={this.state.activeMarker}
              visible
            >
              <div>
                <p>{item.p[0].name_patient}</p>
                <p>{item.p[0].occurrence_patient.complaint_patient}</p>
                <p>{`Viatura - ${this.props.resources[0].board_resource}`}</p>
                <button
                  style={{ zIndex: 200 }}
                  className={`${style.btn} ${style.btnResource}`}
                  data-sendresource={item.id_occurrence}
                >
                  enviar recurso
                </button>
              </div>
            </InfoWindow>
          )
        }
        return null
      })
    }
    return null
  }

  render() {
    const styles = {
      width: '930px',
      height: '500px',
    }
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={styles}
        initialCenter={{
          lat: -18.9118031,
          lng: -48.2642389,
        }}
      >
        {this.renderMarker()}
        {this.renderInfoWindow()}
      </Map>
    )
  }
}

MapContainer.propTypes = {
  google: PropTypes.object,
  occurrences: PropTypes.array,
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCek-ayQkniECUuk1K23dAqapFPjKKCl6w',
})(MapContainer)
