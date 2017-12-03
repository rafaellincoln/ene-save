import React, {
  Component,
} from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-picker'
import {
  connect,
} from 'react-redux'
import { css, withStyles } from '../styles/HackingTheFire'
import validation from '../scheme/medicalEmergency'

const { width } = Dimensions.get('window')

class _MedicalEmergency extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idOccurrence: this.props.occurrence.idOccurrence,
      pressure: '',
      cardioFrequency: '',
      oxigenySaturation: '',
      temperature: '',
      message: '',
      errors: [],
    }
  }

  handlerSubmit() {
    const data = {
      ...this.state,
    }
    delete data.errors
    console.log(data)
    return validation.validate(data, { abortEarly: false })
      .then(() => {})
      .catch((err) => {
        this.setState({
          errors: err.inner,
        }, () => {
          console.log('errors', this.state.errors)
        })
      })
  }

  checkError(key) {
    if (!this.state.errors || this.state[key]) return false

    const errs = this.state.errors.filter(item => item.path === key)
    if (!errs.length) return false

    return errs[0].message
  }

  emergencyError() {
    if (this.props.userError) {
      return (
        <Text style={this.props.styles.error}>{this.props.userError}</Text>
      )
    }
    return false
  }

  handlePress = () => null
  // handlePress = () => {
    // const opts = {
    //   cameraType: 'back',
    //   mediaType: 'photo',
    //   quality: 1,
    //   maxWidth: 300,
    //   maxHeight: 300,
    //   noData: true,
    // }
    // ImagePicker.launchCamera(opts, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker')
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error)
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton)
    //   } else {
    //     const source = { uri: response.uri }
    //     this.setState({
    //       picture: source,
    //       width: response.width,
    //       height: response.height,
    //       pictureError: false,
    //     })
    //   }
    // })
  // }

  renderPicture() {
    if (this.state.picture) {
      return (
        <Image
          source={this.state.picture}
          resizeMode="contain"
          {...css({ width: this.state.width, height: this.state.height })}
        />
      )
    }
    return (
      <View style={{ alignItems: 'center' }}>
        <Text
          {...css(this.props.styles.textPhoto)}
        >
          Adicione foto
        </Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView {...css(this.props.styles.container)}>
        <Text {...css(this.props.styles.subtitle)}>Dados da vítima:</Text>
        <View
          {...css(this.props.styles.dataContainer)}
        >
          <Text
            {...css(this.props.styles.dataLabel)}
          >
            Nome da vítima
          </Text>
          <Text
            {...css(this.props.styles.dataText)}
          >
            {this.props.occurrence.p[0].name_patient}
          </Text>
        </View>
        <Text {...css(this.props.styles.subtitle)}>Sinais vitais:</Text>
        <View
          {...css(this.props.styles.dataContainer)}
        >
          <TextInput
            onChangeText={(value) => { this.setState({ pressure: value }) }}
            placeholder="Pressão"
            style={this.props.styles.input}
            underlineColorAndroid="transparent"
            value={this.state.pressure}
          />
          <Text
            style={this.props.styles.validation}
          >
            {this.checkError('pressure')}
          </Text>
          <TextInput
            onChangeText={(value) => { this.setState({ cardioFrequency: value }) }}
            placeholder="Frequência cardíaca"
            style={this.props.styles.input}
            underlineColorAndroid="transparent"
            value={this.state.cardioFrequency}
          />
          <Text
            style={this.props.styles.validation}
          >
            {this.checkError('cardioFrequency')}
          </Text>
          <TextInput
            onChangeText={(value) => { this.setState({ oxigenySaturation: value }) }}
            placeholder="Saturação de oxigênio"
            style={this.props.styles.input}
            underlineColorAndroid="transparent"
            value={this.state.oxigenySaturation}
          />
          <Text
            style={this.props.styles.validation}
          >
            {this.checkError('oxigenySaturation')}
          </Text>
          <TextInput
            onChangeText={(value) => { this.setState({ temperature: value }) }}
            placeholder="Temperatura"
            style={this.props.styles.input}
            underlineColorAndroid="transparent"
            value={this.state.temperature}
          />
          <Text
            style={this.props.styles.validation}
          >
            {this.checkError('temperature')}
          </Text>
        </View>
        <Text {...css(this.props.styles.subtitle)}>
          Fotos para equipe médica:
        </Text>
        <View
          {...css(this.props.styles.dataContainer)}
        >
          <TouchableOpacity
            onPress={this.handlePress}
            {...css(this.props.styles.containerPhoto)}
            fullWidth
          >
            {this.renderPicture()}
          </TouchableOpacity>
        </View>
        <Text {...css(this.props.styles.subtitle)}>
          Mensagem para equipe médica:
        </Text>
        <View
          {...css(this.props.styles.dataContainer)}
        >
          <TextInput
            onChangeText={(value) => { this.setState({ message: value }) }}
            placeholder="Mensagem"
            {...css(this.props.styles.input, this.props.styles.textArea)}
            multiline
            numberOfLines={4}
            underlineColorAndroid="transparent"
            value={this.state.message}
          />
          <Text
            style={this.props.styles.validation}
          >
            {this.checkError('message')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.handlerSubmit()}
          style={this.props.styles.submit}
        >
          <Text style={this.props.styles.submitText}>
            Enviar!
          </Text>
        </TouchableOpacity>
        {this.emergencyError()}
      </ScrollView>
    )
  }
}

_MedicalEmergency.propTypes = {
  navigation: PropTypes.object.isRequired,
  occurrence: PropTypes.object,
  styles: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  userError: PropTypes.string,
}

_MedicalEmergency.defaultProps = {
  logged: false,
  occurrence: {},
  userError: '',
}

const mapStateToProps = state => ({
  occurrence: state.occurrence,
  userError: state.user.error,
})

const MedicalEmergency = connect(mapStateToProps)(_MedicalEmergency)

export default withStyles(({ color, fontFamily }) => ({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width,
  },
  subtitle: {
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  dataContainer: {
    borderBottomWidth: 2,
    borderColor: color.grey,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
  },
  dataLabel: {
    color: color.darkGrey,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dataText: {
    color: color.darkGrey,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 10,
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
    width: '100%',
  },
  textArea: {
    height: 120,
  },
  validation: {
    color: color.darkGrey,
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  submit: {
    alignSelf: 'center',
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
}))(MedicalEmergency)
