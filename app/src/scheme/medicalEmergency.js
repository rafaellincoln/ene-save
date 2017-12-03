import yup from 'yup'

const idOccurrence = yup.number()

const pressure = yup.string()

const cardioFrequency = yup.string()

const oxigenySaturation = yup.string()

const temperature = yup.string()

const message = yup.string()

const login = yup.object({
  idOccurrence,
  pressure,
  cardioFrequency,
  oxigenySaturation,
  temperature,
  message,
})

export default login
