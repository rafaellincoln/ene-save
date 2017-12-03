import store from 'react-native-simple-store'
import * as types from '../actions/types'

const initialState = {
  logged: false,
  error: '',
  userUpdated: false,
}

function saveUser(payload) {
  store.save('user', payload)
  .catch(err => console.log(err))
}

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SAVE_USER_ID: {
      return { ...state, userId: payload, userUpdated: !state.userUpdated }
    }
    case types.LOGIN: {
      let error = ''
      if (payload.error) {
        error = 'Os dados informados estão incorretos. Tente novamente.'
      }
      saveUser({ ...state, logged: payload.success, error })
      return { ...state, logged: payload.success, error, userUpdated: !state.userUpdated }
    }
    case types.LOST_PASSWORD: {
      let error = ''
      if (payload.error) {
        error = 'Não foi possível completar a requisição. Tente novamente.'
      }
      return { ...state, lostPassword: payload.success, error, userUpdated: !state.userUpdated }
    }
    case types.LOGIN_ERROR:
    case types.LOST_PASSWORD_ERROR: {
      const error = 'Houve um problema em sua requisição. Tente novamente.'
      return { ...state, error, userUpdated: !state.userUpdated }
    }
    default:
      return state
  }
}

export default user
