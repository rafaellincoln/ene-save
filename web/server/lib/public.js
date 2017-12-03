const Session = require('hapi-server-session')
const version = require('../../package.json').version

const internals = {}

exports.register = (server, options, next) => {
  server.register({
    register: Session,
    options: {
      cookie: {
        isSecure: false,
      },
    },
  }, (err) => {
    if (err) {
      throw err
    }
  })

  server.dependency(['AuthCookie'], internals.after)
  return next()
}

exports.register.attributes = {
  name: 'public',
  version,
}

internals.after = (server, next) => {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: {
        strategy: 'session',
        mode: 'try',
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false,
        },
      },
      description: 'Exibe a Landing page',
      handler: (request, reply) => reply.view('public'),
    },
  })

  server.route({
    method: 'GET',
    path: '/chamado',
    config: {
      auth: {
        strategy: 'session',
        mode: 'try',
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false,
        },
      },
      description: 'Exibe a Landing page',
      handler: (request, reply) => reply.view('public'),
    },
  })

  server.route({
    method: 'GET',
    path: '/despacho',
    config: {
      auth: {
        strategy: 'session',
        mode: 'try',
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false,
        },
      },
      description: 'Exibe a tela de Despacho',
      handler: (request, reply) => reply.view('public'),
    },
  })

  server.route({
    method: 'GET',
    path: '/equipe-medica',
    config: {
      auth: {
        strategy: 'session',
        mode: 'try',
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false,
        },
      },
      description: 'Exibe a tela de Equipe Médica',
      handler: (request, reply) => {
        return reply.view('public')
      },
    },
  })

  return next()
}
