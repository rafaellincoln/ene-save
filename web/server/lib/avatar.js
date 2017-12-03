const version = require('../../package.json').version

const internals = {}

exports.register = (server, options, next) => {
  server.dependency('AuthCookie', internals.after)
  return next()
}

exports.register.attributes = {
  name: 'avatar',
  version,
}

internals.after = (server, next) => next()
