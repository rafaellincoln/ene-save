import React, {
  Component,
} from 'react'
import { Platform } from 'react-native'
// import codePush from 'react-native-code-push'
import { Provider } from 'react-redux'
import OneSignal from 'react-native-onesignal'
import Navigator from './navigator'
import Store from './state/store'
import { saveUserId } from './actions/user'
import { loadOccurrence } from './actions/occurrence'

// const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL }

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teste: 'teste',
    }
  }

  componentWillMount() {
    // OneSignal.addEventListener('received', this.onReceived)
  //   OneSignal.addEventListener('registered', this.onRegistered)
    OneSignal.addEventListener('opened', this.onOpened)
    if (Platform.OS === 'android') {
      OneSignal.addEventListener('ids', this.onIds)
    } else {
      Store.dispatch(saveUserId('99999999-999999999-9999-999999999999'))
    }
  }

  componentWillUnmount() {
    // OneSignal.removeEventListener('received', this.onReceived)
    //   OneSignal.removeEventListener('registered', this.onRegistered)
    OneSignal.removeEventListener('opened', this.onOpened)
    if (Platform.android) {
      OneSignal.removeEventListener('ids', this.onIds)
    }
  }

  // onReceived = (notification) => {
    // notification.payload.additionalData.idOccurrence // number
    // console.log('Notification received: ', notification)
  // }

  onOpened = (openResult) => {
    Store.dispatch(loadOccurrence(openResult.notification.payload.additionalData.idOccurrence))
  //   console.log('Message: ', openResult.notification.payload.body)
  //   console.log('isActive: ', openResult.notification.isAppInFocus)
  //   console.log('openResult: ', openResult)
  }

  // onRegistered(notifData) {
  //   console.log("Device had been registered for push notifications!", notifData)
  // }

  onIds = (device) => {
    if (Platform.OS === 'android') {
      Store.dispatch(saveUserId(device.userId))
    }
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     codePush.sync({
  //       updateDialog: false,
  //       installMode: codePush.InstallMode.IMMEDIATE,
  //     })
  //   }, 10000)
  // }

  render() {
    return (
      <Provider store={Store}>
        <Navigator />
      </Provider>
    )
  }
}

// export default codePush(codePushOptions)(Index)
export default Index
