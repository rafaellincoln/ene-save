import React, {
  Component,
} from 'react'
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import {
  NavigationActions,
} from 'react-navigation'
import { fetchLogin } from '../actions/user'
import { withStyles } from '../styles/HackingTheFire'
import validation from '../scheme/login'

const logo = require('../img/logo.png')

const { width } = Dimensions.get('window')

class _Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: [],
    }
  }

  componentWillMount() {
    this.isLogged(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logged !== this.props.logged) {
      this.isLogged(nextProps)
    }
  }

  isLogged(props) {
    if (props.logged) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'home' }),
        ],
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  handlerSubmit() {
    const data = {
      username: this.state.username,
      password: this.state.password,
    }
    return validation.validate(data, { abortEarly: false })
      .then(() => {
        data.user = data.username
        delete data.username
        this.props.fetchLogin(data)
      })
      .catch((err) => {
        this.setState({
          errors: err.inner,
        })
      })
  }

  checkError(key) {
    if (!this.state.errors || this.state[key]) return false

    const errs = this.state.errors.filter(item => item.path === key)
    if (!errs.length) return false

    return errs[0].message
  }

  loginError() {
    if (this.props.userError) {
      return (
        <Text style={this.props.styles.error}>{this.props.userError}</Text>
      )
    }
    return false
  }

  render() {
    return (
      <View style={this.props.styles.container}>
        <Image
          resizeMode="contain"
          style={{ height: width / 3 }}
          source={logo}
        />
        <Text style={this.props.styles.title}>Login</Text>
        <TextInput
          onChangeText={(value) => { this.setState({ username: value }) }}
          placeholder="Código do veículo"
          style={this.props.styles.input}
          underlineColorAndroid="transparent"
          value={this.state.username}
        />
        <Text
          style={this.props.styles.validation}
        >
          {this.checkError('username')}
        </Text>
        <TextInput
          onChangeText={(value) => { this.setState({ password: value }) }}
          placeholder="Senha"
          style={this.props.styles.input}
          secureTextEntry
          underlineColorAndroid="transparent"
          value={this.state.password}
        />
        <Text
          style={this.props.styles.validation}
        >
          {this.checkError('password')}
        </Text>
        <TouchableOpacity
          onPress={() => this.handlerSubmit()}
          style={this.props.styles.submit}
        >
          <Text style={this.props.styles.submitText}>
            Login!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('lostPassword')
          }}
        >
          <Text
            style={this.props.styles.lostPassword}
          >
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
        {this.loginError()}
      </View>
    )
  }
}

_Login.propTypes = {
  fetchLogin: PropTypes.func.isRequired,
  logged: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  userError: PropTypes.string,
}

_Login.defaultProps = {
  logged: false,
  userError: '',
}

const mapStateToProps = state => ({
  logged: state.user.logged,
  userError: state.user.error,
})

const mapActionToProps = {
  fetchLogin,
}

const Login = connect(mapStateToProps, mapActionToProps)(_Login)

export default withStyles(({ color, fontFamily }) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width,
  },
  title: {
    color: color.darkGrey,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: color.white,
    borderRadius: 5,
    borderWidth: 0,
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: width * 0.8,
  },
  validation: {
    color: color.darkGrey,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  submit: {
    backgroundColor: color.blue,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  submitText: {
    color: color.white,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 24,
  },
  lostPassword: {
    color: color.darkGrey,
  },
  error: {
    backgroundColor: color.blue,
    color: color.white,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 20,
    padding: 10,
  },
}))(Login)
