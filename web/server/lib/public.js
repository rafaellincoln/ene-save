const Axios = require('axios')
const ASQ = require('asynquence')
const Session = require('hapi-server-session')
const constant = require('../constant/urls')
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
      handler: (request, reply) => {
        if (request.auth.isAuthenticated) {
          const user = request.auth.credentials
          if (user && (user.cpf && user.aceitouTermoEsseAno)) {
            if (user.comite.liderSocial &&
              user._id === user.comite.liderSocial.voluntarioId
            ) {
              return reply.redirect('/lider')
            }
            return reply.redirect('/voluntario')
          }
          if (user && user.adminLogin) {
            return reply.redirect('/admin')
          }
        }
        return reply.view('public')
      },
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
      handler: (request, reply) => {
        if (request.auth.isAuthenticated) {
          const user = request.auth.credentials
          if (user && (user.cpf && user.aceitouTermoEsseAno)) {
            if (user.comite.liderSocial &&
              user._id === user.comite.liderSocial.voluntarioId
            ) {
              return reply.redirect('/lider')
            }
            return reply.redirect('/voluntario')
          }
          if (user && user.adminLogin) {
            return reply.redirect('/admin')
          }
        }
        return reply.view('public')
      },
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
      handler: (request, reply) => {
        if (request.auth.isAuthenticated) {
          const user = request.auth.credentials
          if (user && (user.cpf && user.aceitouTermoEsseAno)) {
            if (user.comite.liderSocial &&
              user._id === user.comite.liderSocial.voluntarioId
            ) {
              return reply.redirect('/lider')
            }
            return reply.redirect('/voluntario')
          }
          if (user && user.adminLogin) {
            return reply.redirect('/admin')
          }
        }
        return reply.view('public')
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/ocorrencia',
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
      description: 'Exibe a tela de Ocorrencia',
      handler: (request, reply) => {
        if (request.auth.isAuthenticated) {
          const user = request.auth.credentials
          if (user && (user.cpf && user.aceitouTermoEsseAno)) {
            if (user.comite.liderSocial &&
              user._id === user.comite.liderSocial.voluntarioId
            ) {
              return reply.redirect('/lider')
            }
            return reply.redirect('/voluntario')
          }
          if (user && user.adminLogin) {
            return reply.redirect('/admin')
          }
        }
        return reply.view('public')
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/admin/login',
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

    // server.route({
    //   method: 'GET',
    //   path: '/admin/{param*}',
    //   config: {
    //     auth: { strategy: 'session', mode: 'try' },
    //     plugins: { 'hapi-auth-cookie': { redirectTo: false } },
    //     description: 'Exibe a Landing page',
    //     handler: (request, reply) => {
    //       // if (request.auth.isAuthenticated) {
    //       //   return reply.redirect('/admin/empresas')
    //       // }
    //       return reply.view('protect')
    //     },
    //   },
    // }),

  server.route({
    method: 'GET',
    path: '/cadastro/{param*}',
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
      description: 'Exibe a Tela de Cadastro de Usuário',
      handler: (request, reply) => {
        reply.view('public')
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/pagina-exemplo',
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
      description: 'Exibe a Pagina Teste',
      handler: (request, reply) => {
        reply.view('public')
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/welcome',
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
      description: 'Exibe a Tela de Welcome',
      handler: (request, reply) => {
        reply.view('public')
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/recuperar-senha',
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
      description: 'Recuperar Senha',
      handler: (request, reply) => {
        reply.view('public')
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/guideline',
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
      description: 'Exibe a Guideline do projeto',
      handler: (request, reply) => {
        reply.view('public')
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/guidelineAdmin',
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
      description: 'Exibe a Guideline do projeto',
      handler: (request, reply) => {
        reply.view('public')
      },
    },
  })


  server.route({
    method: 'GET',
    path: '/acesso-negado',
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
      description: 'Página de acesso negado para ex-associados',
      handler: (request, reply) => {
        reply.view('public')
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/logged-user',
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
      description: 'Retorna o usario logado armazenado na sessão',
      handler: (request, reply) => {
        reply(request.session.loggedUser || request.auth.credentials ||
          null).code(200)
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/redirect',
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
      description: 'Redireciona o usuário para a landing ou para o página de erro',
      handler: (request, reply) => {
        const baseURL = constant.baseURL
        const nome = request.query.nome ? request.query.nome : request.payload
          .nome
        const email = request.query.email ? request.query.email :
          request.payload.email

        const urlAvatar = `/avatar?email=${email}`
          // const urlAvatar = `http://www.movimentogsg.com.br/userAvatar?email=${email}&simple=1`
          // const urlAvatar = `https://algarnet.sharepoint.com/_layouts/15/userphoto.aspx?size=L&accountname=${email}`

        const req = request

        ASQ()
          .then((done) => { // verifica na base
            Axios.get(
                `${baseURL}/voluntario?filtro={"email":"${email}"}`)
              .then((response) => {
                if (response.data && response.data[0]) {
                  const volunteer = response.data[0]
                  if (volunteer.bloqueado) {
                    return done.fail(false)
                  }
                  if ((!volunteer.cpf) || (!volunteer.aceitouTermoEsseAno)) {
                    return done.fail(true, volunteer)
                  }
                  return done(response.data[0])
                }
                return done.fail(true)
              })
              .catch((error) => {
                console.log(error)
                return done.fail(true)
              })
          })
          .then((done, volunteer) => { // consulta UI.NET
            Axios.get(`${baseURL}/voluntario/valida-cpf?cpf=${volunteer.cpf}`)
              .then((response) => {
                if (response.data && !response.data.dataDemissao) {
                  return done(false, volunteer)
                }
                // atualiza bloqueio
                return done(true, volunteer)
              })
              .catch((error) => {
                console.log(error)
                return done.fail(false)
              })
          })
          .then((done, nextStep, volunteer) => { // login
            if (nextStep) {
              return done(volunteer)
            }

            const volunt = volunteer
            if (request.query.temp) {
              delete volunt.senhaTemp
            }

            const sid = volunteer._id
            return request.server.app.cache.set(sid, {
              account: volunt,
            }, 0, (err) => {
              if (err) {
                return reply(err)
              }
              request.cookieAuth.set({
                sid,
              })
              req.session.loggedUser = null
              if (volunteer.comite.liderSocial && volunteer.comite
                .liderSocial.voluntarioId === String(volunteer._id)
              ) {
                return reply.redirect('/lider')
              }
              return reply.redirect('/voluntario')
            })
          })
          .then((done, volunteer) => { // atualizar bloqueio
            const voluntario = volunteer
            voluntario.bloqueado = true
            Axios.put(`${baseURL}/voluntario`, voluntario)
              .catch((error) => {
                console.log(error)
              })
            return done.fail(false)
          })
          .or((access, volunteer) => {
            if (!access) {
              return reply.redirect(`/acesso-negado?nome=${nome}`)
            }
            const voluntario = volunteer || {
              nome, email, urlAvatar,
            }
            voluntario.usuarioSharePoint = true
            req.session.loggedUser = voluntario
            return reply.redirect('/')
          })
      },
    },
  })

  return next()
}
