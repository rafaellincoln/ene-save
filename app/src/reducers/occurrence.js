import store from 'react-native-simple-store'
import * as types from '../actions/types'

const initialState = {
  error: '',
}

function saveOccurrence(payload) {
  store.save('occurrence', payload)
  .catch(err => console.log(err))
}

const occurrence = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.OCCURRENCE: {
      let error = ''
      if (!payload.address) {
        error = 'Houve um problema em sua requisição. Tente novamente.'
      }
      saveOccurrence({ ...state, ...payload, error })
      return { ...state, ...payload, error }
    }
    case types.OCCURRENCE_ERROR: {
      const error = 'Houve um problema em sua requisição. Tente novamente.'
      return { ...state, error }
    }
    case types.CLEAR_OCCURRENCE: {
      saveOccurrence({ ...initialState })
      return { ...initialState }
    }
    default:
      return state
  }
}

export default occurrence
