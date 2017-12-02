import { combineReducers } from 'redux'

import bottomView from './bottomView'
import nav from './nav'
import user from './user'

export default combineReducers({
  bottomView,
  nav,
  user,
})
