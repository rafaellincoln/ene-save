const version = require('../../package.json').version

const internals = {}

exports.register = (server, options, next) => {
  server.dependency('AuthCookie', internals.after)
  return next()
}

exports.register.attributes = {
  name: 'static',
  version,
}

internals.after = (server, next) => {
  server.route({
    method: 'GET',
    path: '/js/{param*}',
    config: {
      auth: { strategy: 'session', mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: false } },
      handler: {
        directory: {
          path: 'public/js',
          listing: true,
        },
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/css/{param*}',
    config: {
      auth: { strategy: 'session', mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: false } },
      handler: {
        directory: {
          path: 'public/css',
          listing: true,
        },
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/images/{param*}',
    config: {
      auth: { strategy: 'session', mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: false } },
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private',
      },
      handler: {
        directory: {
          path: 'public/images',
          listing: true,
        },
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/downloads/{param*}',
    config: {
      auth: { strategy: 'session', mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: false } },
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private',
      },
      handler: {
        directory: {
          path: 'public/downloads',
          listing: true,
        },
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/videos/{param*}',
    config: {
      auth: { strategy: 'session', mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: false } },
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private',
      },
      handler: {
        directory: {
          path: 'public/videos',
          listing: true,
        },
      },
    },
  })

  return next()
}
