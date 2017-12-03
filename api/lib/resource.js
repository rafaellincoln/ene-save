const Joi = require('joi')
const DB = require('../models')

const Resource = DB['resource']

const user = {
  user: 'admin',
  password: 'admin'
}

exports.register = function (server, options, next) {

  server.route({
    method: 'post',
    path: '/resource/login',
    config: {
      description: 'Login',
      validate: {
        payload: {
          user: Joi.string().required().description('Username'),
          password: Joi.string().required().description('password'),
          userId: Joi.string().required()
        }
      }
    },
    handler: function (request, reply) {
      const response = { success: false }

      Resource.findAll({
        where: {
          number_resource: request.payload.user,
        }
      }).then((resource) => {
        if (resource.lenght === 0) return reply({ success: false, message: 'Usuário não encontrado' })

        console.log(resource[0].id_resource)

        if (request.payload.password === resource[0].number_resource) {
          Resource.update({ status_resource: 2, player_id: request.payload.userId }, {
            where: { id_resource: resource[0].id_resource }
          })

          return reply({ success: true })
        } else {
          return reply({ success: false, message: 'Senha incorreta.' })
        }
      })
    }
  })

  server.route({
    method: 'post',
    path: '/resource/logout',
    config: {
      description: 'logout',
      validate: {
        payload: {
          user: Joi.string().required().description('Username')
        }
      }
    },
    handler: function (request, reply) {
      Resource.update({ status_resource: 1 }, {
        where: { id_resource: resource.id_resource }
      })
    }
  })

  server.route({
    method: 'post',
    path: '/resource/location',
    config: {
      description: 'Update location',
      validate: {
        payload: {
          user: Joi.string().required().description('Username')
        }
      }
    },
    handler: function (request, reply) {
      Resource.update({ status_resource: 1 }, {
        where: { id_resource: resource.id_resource }
      })
    }
  })

  server.route({
    method: 'GET',
    path: '/resource',
    config: {
      description: 'Get Resources'
    },
    handler: function (request, reply) {
      Resource.findAll().then((resource) => {
        reply(resource)
      })
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'resource',
  version: require('../package.json').version
};