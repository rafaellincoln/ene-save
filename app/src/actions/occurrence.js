import store from 'react-native-simple-store'
import {
  NavigationActions,
} from 'react-navigation'
import * as types from './types'
import Occurrence from '../service/Occurrence'

export const fetchOccurrence = () => (
  (dispatch) => {
    store
      .get([
        'occurrence',
      ])
      .then((recoveredState) => {
        if (!recoveredState[0]) {
          const payload = {
            address: null,
          }
          return dispatch({ type: types.OCCURRENCE, payload })
        }
        const occurrence = recoveredState[0]
        return dispatch({ type: types.OCCURRENCE, payload: occurrence })
      })
      .catch(err => console.log(err))
  }
)

const resetToCall = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'home' }),
    NavigationActions.navigate({ routeName: 'call' }),
  ],
})

export const loadOccurrence = (payload, redirect = true) => (
  (dispatch) => {
    Occurrence
      .fetchOccurrence(payload)
      .then((res) => {
        console.log(res)
        if (res.address) {
          res.idOccurrence = payload
          if (redirect) {
            dispatch({ type: types.OCCURRENCE, payload: res })
            return dispatch(resetToCall)
          }
          return dispatch({ type: types.OCCURRENCE, payload: res })
        }
        const data = res
        data.error = true
        if (redirect) {
          dispatch({ type: types.OCCURRENCE, payload: data })
          return dispatch(resetToCall)
        }
        return dispatch({ type: types.OCCURRENCE, payload: data })
      })
      .catch(() => dispatch({ type: types.OCCURRENCE_ERROR, payload: true }))
  }
)

const resetToHome = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'home' }),
  ],
})

export const updateOccurrenceStatus = payload => (
  (dispatch) => {
    Occurrence
      .updateOccurrenceStatus(payload)
      .then(() => {
        if (payload.status[0].type > 5 || payload.status[0].type < 3) {
          dispatch(resetToHome)
          return dispatch({ type: types.CLEAR_OCCURRENCE })
        }
        return dispatch(loadOccurrence(payload.id, false))
      })
      .catch(err => console.log(err))
  }
)
