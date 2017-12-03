import yup from 'yup'

const email = yup.string()
  .required('Por favor, preencha o e-mail')
  .email('Por favor, informe um e-mail válido')

const lostPassword = yup.object({
  email,
})

export default lostPassword
