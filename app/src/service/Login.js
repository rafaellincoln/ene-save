import api from './api'

const Login = {
  async fetchLogin(payload) {
    const res = await api.post('/login', payload)
    console.log(res)
    return res.data
  },
}

export default Login
