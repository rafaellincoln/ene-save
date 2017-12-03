import api from './api'

const Login = {
  async fetchLogin(payload) {
    const res = await api.post('/resource/login', payload)
    return res.data
  },
}

export default Login
