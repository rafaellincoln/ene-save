import React from 'react'
import PropTypes from 'prop-types'
import {
  Map,
  Marker,
  GoogleApiWrapper,
} from 'google-maps-react'

class MapContainer extends React.Component {
  componentWillMount() {}

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
        <Marker onClick={this.onMarkerClick} name={'Current location'} />
        <Marker
          title={'Bar do Gaúcho'}
          name={'BAR DO GAÚCHO'}
          position={{ lat: -18.9116825, lng: -48.2666459 }}
          icon={{
            url: '/images/marker.svg',
          }}
        />
        <Marker
          title={'Center Shopping'}
          name={'CENTER SHOPPING'}
          position={{ lat: -18.9118031, lng: -48.2642389 }}
        />
        <Marker
          title={'Barbosão Supermercado'}
          name={'BARBOSÃO SUPERMERCADO'}
          position={{ lat: -18.912558, lng: -48.2743029 }}
          icon={{
            url: '/images/marker-bad.png',
          }}
        />
      </Map>
    )
  }
}

MapContainer.propTypes = {
  google: PropTypes.object,
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCek-ayQkniECUuk1K23dAqapFPjKKCl6w',
})(MapContainer)
