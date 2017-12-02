exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/version',
    handler: function (request, reply) {
      const version = require('../package.json').version
      reply(version)
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'version',
  version: require('../package.json').version
};