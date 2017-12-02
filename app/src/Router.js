import React from 'react'
import {
  Platform,
} from 'react-native'

import theme from './styles/theme'

import Route from './ui/Route'

import splash from './containers/Splash'
import login from './containers/Login'
import lostPassword from './containers/LostPassword'
import home from './containers/Home'
import call from './containers/Call'
import medicalEmergency from './containers/MedicalEmergency'

// RouteConfigs
export const Router = {
  splash: {
    screen: splash,
    navigationOptions: {
      header: null,
    },
  },
  login: {
    screen: login,
    navigationOptions: {
      header: null,
    },
  },
  lostPassword: {
    screen: lostPassword,
    navigationOptions: {
      header: null,
    },
  },
  home: {
    screen: home,
    navigationOptions: {
      title: 'Corpo Bombeiros Previna Intranet',
    },
  },
  call: {
    screen: call,
    navigationOptions: {
      title: 'Detalhes do chamado',
      headerRight: <Route />,
    },
  },
  medicalEmergency: {
    screen: medicalEmergency,
    navigationOptions: {
      title: 'Emergência médica',
    },
    // path: '/',
    // navigationOptions: ({ navigation }) => ({
    //   title: `${navigation.state.params.name}'s Profile'`,
    //   header: '',
    //   headerTitle: '',
    //   headerBackTitle: '',
    //   headerTruncatedBackTitle: '',
    //   headerRight: '',
    //   headerLeft: '',
    //   headerStyle: '',
    //   headerTitleStyle: '',
    //   headerBackTitleStyle: '',
    //   headerTintColor: '',
    //   headerPressColorAndroid: '',
    //   gesturesEnabled: '',
    // }),
  },
}

// StackNavigatorConfig
export const Config = {
  initialRouteName: 'splash',
  navigationOptions: {
    headerTruncatedBackTitle: 'voltar',
    headerStyle: {
      backgroundColor: theme.color.orange,
      height: Platform.OS === 'ios' ? 80 : 60,
    },
    headerTintColor: theme.color.darkGrey,
    headerTitleStyle: {
      fontFamily: 'Chantilly-Serial-Regular',
      fontSize: 20,
      alignSelf: 'center',
    },
  },
  cardStyle: {
    backgroundColor: theme.color.lightGrey,
  },
}
