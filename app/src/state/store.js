import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import rootReducer from '../reducers/'

const store = createStore(
  rootReducer,
  applyMiddleware(
    reduxPackMiddleware,
    thunk,
  ),
)

export default store
