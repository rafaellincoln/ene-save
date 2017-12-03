import api from './api'

const Occurrence = {
  async fetchOccurrence(payload) {
    const res = await api.get(`/occurrence/${payload}`)
    return res.data
  },

  async updateOccurrenceStatus(payload) {
    const res = await api.put('/occurrence/action', payload)
    return res.data
  },
}

export default Occurrence
