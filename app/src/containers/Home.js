import React, {
  PureComponent,
} from 'react'
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  connect,
} from 'react-redux'
import PropTypes from 'prop-types'
import {
  loadOccurrence,
} from '../actions/occurrence'
import {
  updateLocation,
} from '../actions/location'
import { css, withStyles } from '../styles/HackingTheFire'
import Card from '../ui/Card'

const { width } = Dimensions.get('window')

class _Home extends PureComponent {
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
        }, () => {
          this.props.updateLocation(`${this.state.latitude}, ${this.state.longitude}`)
        })
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }

  renderCallButton() {
    if (!this.props.occurrence.idOccurrence) return null
    return (
      <TouchableOpacity
        {...css(this.props.styles.callButton)}
        onPress={() => {
          this.props.navigation.navigate('call')
        }}
      >
        <Text {...css(this.props.styles.callButtonInner)}>Acessar chamado</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView>
        {this.renderCallButton()}
        <Text style={this.props.styles.subtitle}>Status dos atendimentos AO VIVO:</Text>
        <FlatList
          bounces={false}
          data={[
            {
              title: 'Atendimentos em aberto',
              color: this.props.theme.color.red,
              value: 5,
              total: 20,
              key: String(Math.random()),
            },
            {
              title: 'Atendimentos a caminho',
              color: this.props.theme.color.lightOrange,
              value: 3,
              total: 20,
              key: String(Math.random()),
            },
            {
              title: 'Atendimentos em andamento',
              color: this.props.theme.color.blue,
              value: 12,
              total: 20,
              key: String(Math.random()),
            },
          ]}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              color={item.color}
              value={item.value}
              total={item.total}
            />
          )}
        />
        {
          Platform.OS === 'ios'
          ? (
            <TouchableOpacity
              onPress={() => {
                this.props.loadOccurrence(3)
              }}
              style={{
                alignSelf: 'center',
                marginVertical: 20,
              }}
            >
              <Text>Abrir chamado (iOS)</Text>
            </TouchableOpacity>
          ) : null
        }
      </ScrollView>
    )
  }
}

_Home.propTypes = {
  loadOccurrence: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  occurrence: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  updateLocation: PropTypes.func,
}

_Home.defaultProps = {
  loadOccurrence: () => {},
  updateLocation: () => {},
}

const mapStateToProps = state => ({
  occurrence: state.occurrence,
})

const mapActionToProps = {
  loadOccurrence,
  updateLocation,
}

const Home = connect(mapStateToProps, mapActionToProps)(_Home)

export default withStyles(({ color, fontFamily }) => ({
  callButton: {
    backgroundColor: color.blue,
    borderRadius: 8,
    elevation: 10,
    marginHorizontal: (width * 0.1) / 2,
    marginVertical: 20,
    padding: 15,
    shadowColor: color.black,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    width: width * 0.9,
  },
  callButtonInner: {
    color: color.white,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
}))(Home)
