import yup from 'yup'

const username = yup.string()
  .required('Por favor, preencha o código do veículo')

const password = yup.string()
  .required('Por favor, preencha a senha')

const login = yup.object({
  username,
  password,
})

export default login
