const Joi = require('joi')

const user = {
  user: 'admin',
  password: 'admin'
}

exports.register = function (server, options, next) {

  server.route({
    method: 'post',
    path: '/login',
    config: {
      description: 'Login',
      validate: {
        payload: {
          user: Joi.string().required().description('Username'),
          password: Joi.string().required().description('password')
        }
      }
    },
    handler: function (request, reply) {
      const response = { success: false }

      if (request.payload.user === user.user && request.payload.password == user.password) {
        response.success = true
      }

      reply(response)
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'user',
  version: require('../package.json').version
};