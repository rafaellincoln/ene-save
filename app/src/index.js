import React, {
  Component,
} from 'react'
// import codePush from 'react-native-code-push'
import { Provider } from 'react-redux'
// import OneSignal from 'react-native-onesignal'
import Navigator from './navigator'
import Store from './state/store'

// const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL }

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teste: 'teste',
    }
  }

  // componentWillMount() {
  //   OneSignal.addEventListener('received', this.onReceived);
  //   OneSignal.addEventListener('opened', this.onOpened);
  //   OneSignal.addEventListener('registered', this.onRegistered);
  //   OneSignal.addEventListener('ids', this.onIds);
  // }
  //
  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  //   OneSignal.removeEventListener('registered', this.onRegistered);
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }
  //
  // onReceived(notification) {
  //   console.log("Notification received: ", notification);
  // }
  //
  // onOpened(openResult) {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  // }
  //
  // onRegistered(notifData) {
  //   console.log("Device had been registered for push notifications!", notifData);
  // }
  //
  // onIds(device) {
  //   console.log('Device info: ', device);
  // }

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
