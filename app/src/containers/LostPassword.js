import React, {
  Component,
} from 'react'
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { withStyles } from '../styles/HackingTheFire'
import validation from '../scheme/lostPassword'

const logo = require('../img/logo.png')

const { width } = Dimensions.get('window')

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      errors: [],
    }
  }

  handlerSubmit() {
    const data = {
      email: this.state.email,
    }
    return validation.validate(data, { abortEarly: false })
      .then(() => {
        console.log('deu certo, agora manda pro serviço cavalo')
      })
      .catch((err) => {
        this.setState({
          errors: err.inner,
        })
      })
  }

  checkError(key) {
    if (!this.state.errors) return false

    const errs = this.state.errors.filter(item => item.path === key)
    if (!errs.length) return false

    return errs[0].message
  }

  render() {
    return (
      <View style={this.props.styles.container}>
        <Image
          resizeMode="contain"
          style={{ height: width / 3 }}
          source={logo}
        />
        <Text style={this.props.styles.title}>Esqueci minha senha</Text>
        <Text style={this.props.styles.description}>
          Para recuperar sua senha, informe abaixo o e-mail vinculado a sua
          conta.
        </Text>
        <TextInput
          onChangeText={(value) => { this.setState({ email: value }) }}
          placeholder="E-mail"
          style={this.props.styles.input}
          underlineColorAndroid="transparent"
          value={this.state.email}
        />
        <Text
          style={this.props.styles.validation}
        >
          {this.checkError('email')}
        </Text>
        <TouchableOpacity
          onPress={() => this.handlerSubmit()}
          style={this.props.styles.submit}
        >
          <Text style={this.props.styles.submitText}>
            Recuperar senha!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack()
          }}
        >
          <Text
            style={this.props.styles.goBack}
          >
            Voltar para o login
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
}

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
  description: {
    color: color.darkGrey,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: Platform.ios ? (width * 0.1) - 10 : width * 0.1,
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
  goBack: {
    color: color.darkGrey,
  },
}))(Login)
