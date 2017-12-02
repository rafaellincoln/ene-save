import React, {
  Component,
} from 'react'
import {
  Dimensions,
  Image,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import {
  NavigationActions,
} from 'react-navigation'
import { fetchUser } from '../actions/user'
import { withStyles } from '../styles/HackingTheFire'

const logo = require('../img/logo.png')

const { width } = Dimensions.get('window')

class _Splash extends Component {
  componentWillMount() {
    this.props.fetchUser()
  }

  componentWillReceiveProps(nextProps) {
    this.isLogged(nextProps)
  }

  isLogged(props) {
    if (props.logged) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'home' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    } else {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'login' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  render() {
    return (
      <View style={this.props.styles.container}>
        <Image
          resizeMode="contain"
          style={{ height: width / 3 }}
          source={logo}
        />
      </View>
    )
  }
}

_Splash.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
}

_Splash.defaultProps = {
  logged: false,
}

const mapStateToProps = state => ({
  logged: state.user.logged,
  userUpdated: state.user.userUpdated,
})

const mapActionToProps = {
  fetchUser,
}

const Splash = connect(mapStateToProps, mapActionToProps)(_Splash)

export default withStyles(() => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width,
  },
}))(Splash)
