import React from 'react'
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

const Tabs = props => (
  <View {...css(props.styles.container)}>
    <TouchableOpacity
      {...css(
        props.styles.tab,
        props.actualRoute === 'home'
        ? { backgroundColor: props.theme.color.lightOrange }
        : { backgroundColor: props.theme.color.orange },
      )}
      onPress={() => {
        if (props.actualRoute !== 'home') {
          props.navigation.navigate('home')
        }
      }}
    >
      <View {...css(props.styles.inner)}>
        <Image
          resizeMode="contain"
          source={checkin}
          style={{ height: 30 }}
        />
        <Text
          {...css(
            props.styles.text,
          )}
        >
          Check-in
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      {...css(
        props.styles.tab,
        props.actualRoute === 'teste1'
        ? { backgroundColor: props.theme.color.lightOrange }
        : { backgroundColor: props.theme.color.orange },
      )}
      onPress={() => {
        if (props.actualRoute !== 'teste1') {
          props.navigation.navigate('teste1')
        }
      }}
    >
      <View {...css(props.styles.inner)}>
        <Image
          resizeMode="contain"
          source={checkout}
          style={{ height: 30 }}
        />
        <Text
          {...css(
            props.styles.text,
          )}
        >
          Check-out
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      {...css(
        props.styles.tab,
        props.actualRoute === 'teste2'
        ? { backgroundColor: props.theme.color.lightOrange }
        : { backgroundColor: props.theme.color.orange },
      )}
      onPress={() => {
        if (props.actualRoute !== 'teste2') {
          props.navigation.navigate('teste2')
        }
      }}
    >
      <View {...css(props.styles.inner)}>
        <Image
          resizeMode="contain"
          source={emergency}
          style={{ height: 30 }}
        />
        <Text
          {...css(
            props.styles.text,
          )}
        >
          Emergência Médica
        </Text>
      </View>
    </TouchableOpacity>
  </View>
)

Tabs.propTypes = {
  navigation: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  actualRoute: PropTypes.string,
}

Tabs.defaultProps = {
  actualRoute: 'home',
}

export default withStyles(({ color }) => ({
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
    color: color.darkGrey,
    fontSize: width < 380 ? 13 : 15,
    textAlign: 'center',
  },
}))(Tabs)
