import { StackNavigator } from 'react-navigation'

import { Router, Config } from '../Router'

const AppNavigator = StackNavigator(Router, Config)

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('splash'))

export default (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  return nextState || state
}
