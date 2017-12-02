import React, {
  Component,
} from 'react'
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import {
  css,
  withStyles,
} from '../../styles/HackingTheFire'

const checkin = require('../../img/checkin.png')
const checkout = require('../../img/checkout.png')
const emergency = require('../../img/emergency.png')

const { width } = Dimensions.get('window')

class StatusCard extends Component {
  render2() {
    return (
      <View {...css(this.props.styles.container)}>
        <Text {...css(this.props.styles.title)}>{this.props.title}</Text>
        <TouchableOpacity
          {...css(this.props.styles.button, this.props.styles.buttonStart)}
          onPress={this.props.onPress}
        >
          <Text {...css(this.props.styles.buttonStartText)}>INICIAR</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render3() {
    return (
      <View {...css(this.props.styles.container)}>
        <View>
          <Text {...css(this.props.styles.title)}>{this.props.title}</Text>
          <Text {...css(this.props.styles.timeRed)}>
            {this.props.timeLeft}min até o destino
          </Text>
        </View>
        <TouchableOpacity
          {...css(this.props.styles.button, this.props.styles.buttonCheck)}
          onPress={this.props.onPress}
        >
          <Image
            resizeMode="contain"
            source={checkin}
            style={{ height: 30, width: 30 }}
          />
          <Text {...css(this.props.styles.buttonText)}>CHECK-IN</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render4() {
    return (
      <View
        {...css(
          this.props.styles.container,
          this.props.styles.containerVertical,
        )}
      >
        <View {...css(this.props.styles.textsHorizontal)}>
          <Text {...css(this.props.styles.title)}>{this.props.title}</Text>
          <Text {...css(this.props.styles.timeGreen)}>
            {this.props.timeSpent}min em atendimento
          </Text>
        </View>
        <View {...css(this.props.styles.buttonsHorizontal)}>
          <TouchableOpacity
            {...css(
              this.props.styles.button,
              this.props.styles.buttonCheck,
              this.props.styles.buttonM,
            )}
            onPress={this.props.onPressCheckout}
          >
            <Image
              resizeMode="contain"
              source={checkout}
              style={{ height: 24, width: 24 }}
            />
            <Text
              {...css(
                this.props.styles.buttonText,
                this.props.styles.buttonTextM,
              )}
            >
              CHECK-OUT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            {...css(
              this.props.styles.button,
              this.props.styles.buttonCheck,
              this.props.styles.buttonM,
            )}
            onPress={this.props.onPressEmergency}
          >
            <Image
              resizeMode="contain"
              source={emergency}
              style={{ height: 24, width: 24 }}
            />
            <Text
              {...css(
                this.props.styles.buttonText,
                this.props.styles.buttonTextM,
              )}
            >
              EMERGÊNCIA MÉDICA
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render5() {
    return (
      <View {...css(this.props.styles.container)}>
        <Text {...css(this.props.styles.title)}>{this.props.title}</Text>
      </View>
    )
  }
  render() {
    if (this.props.statusCode === 2) {
      return this.render2()
    }
    if (this.props.statusCode === 3) {
      return this.render3()
    }
    if (this.props.statusCode === 4) {
      return this.render4()
    }
    return this.render5()
  }
}

StatusCard.propTypes = {
  onPress: PropTypes.func,
  onPressCheckout: PropTypes.func,
  onPressEmergency: PropTypes.func,
  statusCode: PropTypes.number.isRequired,
  styles: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  timeLeft: PropTypes.number,
  timeSpent: PropTypes.number,
}

StatusCard.defaultProps = {
  onPress: () => {},
  onPressCheckout: () => {},
  onPressEmergency: () => {},
  timeLeft: 0,
  timeSpent: 0,
}

export default withStyles(({ color }) => ({
  container: {
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 8,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width < 380 ? (width * 0.05) / 2 : (width * 0.1) / 2,
    marginVertical: 20,
    padding: 15,
    shadowColor: color.black,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    width: width < 380 ? width * 0.95 : width * 0.9,
  },
  containerVertical: {
    flexDirection: 'column',
  },
  textsHorizontal: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsHorizontal: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  buttonStart: {
    backgroundColor: color.lightGreen,
  },
  buttonStartText: {
    color: color.white,
    fontSize: 20,
  },
  timeRed: {
    color: color.red,
  },
  timeGreen: {
    color: color.green,
  },
  buttonCheck: {
    backgroundColor: color.lightOrange,
    flexDirection: 'row',
  },
  buttonM: {
    borderRadius: 10,
    flexDirection: 'column',
    height: 70,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: width < 380 ? 15 : 20,
    marginLeft: 10,
  },
  buttonTextM: {
    margin: 0,
  },
}))(StatusCard)
