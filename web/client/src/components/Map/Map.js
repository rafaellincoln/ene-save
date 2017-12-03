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
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onMapClicked = this.onMapClicked.bind(this)
  }

  onMarkerClick(prop, mark) {
    this.setState({
      selectedPlace: prop,
      activeMarker: mark,
      showingInfoWindow: true,
    })
  }

  onMapClicked() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  }

  renderMarker() {
    console.log(this.props.occurrences)
    if (this.props.occurrences.length) {
      return this.props.occurrences.map(item => (
        <Marker
          key={item.id_occurrence}
          position={{ lat: item.location.lat, lng: item.location.long }}
          icon={{
            url: '/images/marker.svg',
          }}
          onClick={this.onMarkerClick}
        />
      ))
    }

    return null
  }

  renderInfoWindow() {
    return (
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
      >
        <div>
          <h1>{this.state.selectedPlace.name}</h1>
        </div>
      </InfoWindow>
    )
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
