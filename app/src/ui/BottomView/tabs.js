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
  connect,
} from 'react-redux'
import moment from 'moment'
import {
  updateOccurrenceStatus,
} from '../../actions/occurrence'
import {
  css,
  withStyles,
} from '../../styles/HackingTheFire'

const checkin = require('../../img/checkin.png')
const checkout = require('../../img/checkout.png')
const emergency = require('../../img/emergency.png')

const { width } = Dimensions.get('window')

class _Tabs extends Component {
  updateOccurrenceStatus = (type) => {
    const payload = {
      id: this.props.occurrence.idOccurrence,
      status: [
        {
          type,
          date: moment().utc(),
        },
      ],
    }
    this.props.updateOccurrenceStatus(payload)
  }
  render() {
    const lastStatusType =
      this.props.occurrence.status[this.props.occurrence.status.length - 1].type
    return (
      <View {...css(this.props.styles.container)}>
        <TouchableOpacity
          {...css(this.props.styles.tab)}
          onPress={() => {
            if (lastStatusType !== 4) return
            this.updateOccurrenceStatus(5)
          }}
          activeOpacity={1}
        >
          <View
            {...css(
              this.props.styles.inner,
              {
                opacity: lastStatusType !== 4
                  ? 0.3
                  : 1,
              },
            )}
          >
            <Image
              resizeMode="contain"
              source={checkin}
              style={{ height: 30 }}
            />
            <Text
              {...css(
                this.props.styles.text,
              )}
            >
              Check-in
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          {...css(this.props.styles.tab)}
          onPress={() => {
            if (lastStatusType !== 5) return
            this.updateOccurrenceStatus(6)
          }}
          activeOpacity={1}
        >
          <View
            {...css(
              this.props.styles.inner,
              {
                opacity: lastStatusType !== 5
                  ? 0.3
                  : 1,
              },
            )}
          >
            <Image
              resizeMode="contain"
              source={checkout}
              style={{ height: 30 }}
            />
            <Text {...css(this.props.styles.text)}>
              Check-out
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          {...css(this.props.styles.tab)}
          onPress={() => {
            if (lastStatusType !== 5) return
            this.props.navigation.navigate('medicalEmergency')
          }}
          activeOpacity={1}
        >
          <View
            {...css(
              this.props.styles.inner,
              {
                opacity: lastStatusType !== 5
                  ? 0.3
                  : 1,
              },
            )}
          >
            <Image
              resizeMode="contain"
              source={emergency}
              style={{ height: 30 }}
            />
            <Text
              {...css(
                this.props.styles.text,
              )}
            >
              Emergência Médica
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

_Tabs.propTypes = {
  navigation: PropTypes.object.isRequired,
  occurrence: PropTypes.object,
  styles: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  updateOccurrenceStatus: PropTypes.func,
}

_Tabs.defaultProps = {
  occurrence: {},
  updateOccurrenceStatus: () => {},
}

const mapStateToProps = state => ({
  occurrence: state.occurrence,
})

const mapActionToProps = {
  updateOccurrenceStatus,
}

const Tabs = connect(mapStateToProps, mapActionToProps)(_Tabs)

export default withStyles(({ color, fontFamily }) => ({
  container: {
    backgroundColor: color.orange,
    elevation: 10,
    flexDirection: 'row',
    height: 60,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3,
  },
  tab: {
    justifyContent: 'center',
    width: '33.333%',
  },
  inner: {
    alignItems: 'center',
  },
  text: {
    fontFamily: fontFamily.chantillySerialRegular,
    fontSize: width < 380 ? 13 : 15,
    textAlign: 'center',
  },
}))(Tabs)
