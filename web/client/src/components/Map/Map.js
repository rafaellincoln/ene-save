import React from 'react'
import PropTypes from 'prop-types'
import {
  Map,
  Marker,
  GoogleApiWrapper,
  InfoWindow,
} from 'google-maps-react'

class MapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMarker: null,
      selectedPlace: null,
    }
    this.onMarkerClick = this.onMarkerClick.bind(this)
  }

  onMarkerClick(prop, mark) {
    this.setState({
      selectedPlace: prop,
      activeMarker: mark,
    })
  }

  renderMarker() {
    if (this.props.occurrences.length) {
      return this.props.occurrences.map((item) => {
        if (item.status[item.status.length - 1].type === 2) {
          return (
            <Marker
              key={item.id_occurrence}
              position={{ lat: item.location.lat, lng: item.location.long }}
              icon={{
                url: '/images/marker.svg',
              }}
              onClick={this.onMarkerClick}
            />
          )
        }
        return null
      })
    }
    return null
  }

  renderInfoWindow() {
    if (this.props.occurrences.length) {
      return this.props.occurrences.map((item) => {
        if (this.state.activeMarker && this.state.activeMarker.position.lat() === item.location.lat) {
          return (
            <InfoWindow
              key={item.id_occurrence}
              marker={this.state.activeMarker}
              visible
            >
              <div>
                <p>{JSON.stringify(item.p[0].name_patient)}</p>
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
    const style = {
      width: '930px',
      height: '500px',
    }
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={style}
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
