import React, {
  Component,
} from 'react'
import {
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import getDirections from 'react-native-google-maps-directions'
import { withStyles } from '../../styles/HackingTheFire'

const route = require('../../img/route.png')

class Call extends Component {
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: -18.907971,
        longitude: -48.2615868,
      },
      destination: {
        latitude: -18.904984,
        longitude: -48.2843733,
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

Call.propTypes = {
  // navigation: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
}

export default withStyles(() => ({
  container: {
    paddingHorizontal: 10,
  },
}))(Call)
