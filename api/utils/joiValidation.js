const Joi = require('joi')

exports.validations = {
  text: Joi.string().required(),
  textOptional: Joi.string().required().optional().allow(null),
  number: Joi.number().required(),
  numberOptional: Joi.number().optional().allow(null)
}