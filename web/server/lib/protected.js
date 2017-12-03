const version = require('../../package.json').version

const internals = {}

exports.register = (server, options, next) => {
  server.dependency(['AuthCookie'], internals.after)
  return next()
}

exports.register.attributes = {
  name: 'protected',
  version,
}

internals.after = (server, next) => {
  server.route({
    method: 'GET',
    path: '/admin/{param*}',
    config: {
      auth: { strategy: 'session', mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: '/admin/login' } },
      description: 'Caso tente entrar no admin sem login, encaminhar para a pagina de login do admin',
      handler: (request, reply) => {
        const user = request.auth.credentials
        if (!user) {
          return reply.redirect('/')
        }
        // if (request.params.param !== 'nova-senha') {
        //   if (user && user.senhaTemp) {
        //     return reply.redirect('/nova-senha')
        //   }
        // }
        if (user && (user.cpf && user.aceitouTermoEsseAno)) {
          if (user.comite.liderSocial &&
            user._id === user.comite.liderSocial.voluntarioId
          ) {
            return reply.redirect('/lider')
          }
          return reply.redirect('/voluntario')
        }
        return reply.view('protected')
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/{param*}',
    config: {
      auth: { strategy: 'session', mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: '/' } },
      description: 'Direciona todas as demais rotas para a versão logada',
      handler: (request, reply) => {
        const user = request.auth.credentials
        if (!user) {
          return reply.redirect('/')
        }
        if (request.params.param !== 'nova-senha') {
          if (user && user.senhaTemp) {
            return reply.redirect('/nova-senha')
          }
        }
        if (user && user.adminLogin) {
          return reply.redirect('/admin')
        }
        return reply.view('protected')
      },
    },
  })

  return next()
}
