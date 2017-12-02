exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/occurrence',
    handler: function (request, reply) {
      const version = require('../package.json').version
      reply(version)
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'occurrence',
  version: require('../package.json').version
};