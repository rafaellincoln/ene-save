import api from './api'

const Location = {
  async updateLocation(payload) {
    const res = await api.post('/resource/location', payload)
    return res.data
  },
}

export default Location
