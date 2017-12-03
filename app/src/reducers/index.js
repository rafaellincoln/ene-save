import { combineReducers } from 'redux'

import bottomView from './bottomView'
import occurrence from './occurrence'
import nav from './nav'
import user from './user'

export default combineReducers({
  bottomView,
  occurrence,
  nav,
  user,
})
