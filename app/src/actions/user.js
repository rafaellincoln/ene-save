import store from 'react-native-simple-store'
import * as types from './types'
import Login from '../service/Login'
import LostPassword from '../service/LostPassword'

export const saveUserId = payload => (
  dispatch => dispatch({ type: types.SAVE_USER_ID, payload })
)

export const fetchUser = () => (
  (dispatch) => {
    store
      .get([
        'user',
      ])
      .then((recoveredState) => {
        if (!recoveredState[0]) {
          const payload = {
            success: false,
          }
          return dispatch({ type: types.LOGIN, payload })
        }
        const user = recoveredState[0]
        const payload = {
          success: user.logged,
        }
        return dispatch({ type: types.LOGIN, payload })
      })
      .catch(err => console.log(err))
  }
)

export const fetchLogin = payload => (
  (dispatch, state) => {
    const newPayload = payload
    const userId = state().user.userId
    newPayload.userId = userId
    Login
      .fetchLogin(newPayload)
      .then((res) => {
        if (res.success) {
          return dispatch({ type: types.LOGIN, payload: res })
        }
        const data = res
        data.error = true
        return dispatch({ type: types.LOGIN, payload: data })
      })
      .catch(() => dispatch({ type: types.LOGIN_ERROR, payload: true }))
  }
)

export const fetchLostPassword = payload => (
  (dispatch) => {
    LostPassword
      .fetchLostPassword(payload)
      .then((res) => {
        if (res.success) {
          return dispatch({ type: types.LOST_PASSWORD, payload: res })
        }
        const data = res
        data.error = true
        return dispatch({ type: types.LOST_PASSWORD, payload: res })
      })
      .catch(() => dispatch({ type: types.LOST_PASSWORD_ERROR, payload: true }))
  }
)
