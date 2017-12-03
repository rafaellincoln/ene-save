import React, {
  Component,
} from 'react'
import {
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import getDirections from 'react-native-google-maps-directions'
import { withStyles } from '../../styles/HackingTheFire'

const route = require('../../img/route.png')

class _Route extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    }
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        })
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }

  handleGetDirections = () => {
    const data = {
      source: {
        latitude: this.props.occurrence.location.lat,
        longitude: this.props.occurrence.location.long,
      },
      destination: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      },
      params: [
        {
          key: 'dirflg',
          value: 'c',
        },
      ],
    }
    getDirections(data)
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handleGetDirections}
        style={this.props.styles.container}
      >
        <Image
          resizeMode="contain"
          source={route}
          style={{ height: 30 }}
        />
        <Text>Traçar rota</Text>
      </TouchableOpacity>
    )
  }
}

_Route.propTypes = {
  occurrence: PropTypes.object,
  styles: PropTypes.object.isRequired,
}

_Route.defaultProps = {
  occurrence: {},
}

const mapStateToProps = state => ({
  occurrence: state.occurrence,
})

const Route = connect(mapStateToProps)(_Route)

export default withStyles(() => ({
  container: {
    paddingHorizontal: 10,
  },
}))(Route)
