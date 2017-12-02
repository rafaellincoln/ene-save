// import api from './api'

const LostPassword = {
  // async fetchLostPassword(payload) {
  async fetchLostPassword() {
    // const res = await api.post('/login', payload)
    const res = {
      success: true,
      message: `[MOCK] Solicitação de recuperação de senha realizada com 
        sucesso. Em breve deverá chegar um e-mail em sua caixa de entrada com o 
        link para a alteração da senha.`,
    }
    return res.data
  },
}

export default LostPassword
