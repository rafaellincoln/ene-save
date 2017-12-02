const Axios = require('axios')
const constant = require('../constant/urls')
const version = require('../../package.json').version

const internals = {}

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

exports.register = (server, options, next) => {
  server.dependency(['AuthCookie'], internals.after)
  return next()
}

exports.register.attributes = {
  name: 'auth',
  version,
}

internals.after = (server, next) => {
  server.route({
    method: 'GET',
    path: '/entrar',
    config: {
      auth: { strategy: 'session', mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: false } },
      description: 'Exibe a Landing page com o componente para login',
      handler: (request, reply) => {
        reply.view('public')
      },
    },
  })

  server.route({
    method: 'POST',
    path: '/login',
    config: {
      description: 'Valida o Login do usuário e armazena o cookie de autenticação',
      handler: (request, reply) => {
        // TODO: Implementar a chamada do serviço que busca o usuário e autentica
        // Verificar como base o módulo am-auth da ilha-conteudo
        // Retornar os casos de sucesso e os casos de erro na autenticação

        const baseURL = constant.baseURL
        if (!request.payload.username ||
            !request.payload.password) {
          return reply({ logged: false, message: 'E-mail e/ou senha não informados.' })
        }

        return Axios.get(`${baseURL}/voluntario/login`, {
          params: {
            login: request.payload.username,
            senha: request.payload.password,
          },
        })
        .then((response) => {
          if (!response.data._id) {
            return reply({ logged: false, message: 'E-mail e/ou senha inválidos.' })
          }
          const account = response.data
          const sid = account._id
          return request.server.app.cache.set(sid, { account }, 0, (err) => {
            if (err) {
              console.log(err)
              return reply(err)
            }

            request.cookieAuth.set({ sid })
            return reply({ logged: true, message: 'Login realizado com sucesso.', user: account })
          })
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            return reply(err.response.data).code(err.response.status)
          }
          return reply(err)
        })
      },
      auth: { mode: 'try' },
      plugins: {
        'hapi-auth-cookie': { redirectTo: false },
      },
    },
  })

  server.route({
    method: 'POST',
    path: '/login-admin',
    config: {
      description: 'Valida o Login do usuário e armazena o cookie de autenticação',
      handler: (request, reply) => {
        const baseURL = constant.baseURL
        if (!request.payload.username ||
            !request.payload.password) {
          return reply({ logged: false, message: 'Dado do usuário não informado.' })
        }

        return Axios.post(`${baseURL}/parametro-sistema/login`, {
          adminLogin: request.payload.username,
          adminSenha: request.payload.password,
        })
        .then((response) => {
          if (!response.data._id) {
            return reply({ logged: false, message: 'Usuário inválido.' })
          }
          const account = response.data
          const sid = account._id
          return request.server.app.cache.set(sid, { account }, 0, (err) => {
            if (err) {
              console.log(err)
              return reply(err)
            }

            request.cookieAuth.set({ sid })
            return reply({ logged: true, message: 'Login realizado com sucesso.', user: account })
          })
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            return reply(err.response.data).code(err.response.status)
          }
          return reply(err)
        })
      },
      auth: { mode: 'try' },
      plugins: {
        'hapi-auth-cookie': { redirectTo: false },
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/logout',
    config: {
      description: 'Finaliza a sessão do usuário',
      handler: (request, reply) => {
        request.cookieAuth.clear()
        return reply.redirect('/')
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/logout-admin',
    config: {
      description: 'Finaliza a sessão do usuário',
      handler: (request, reply) => {
        request.cookieAuth.clear()
        return reply.redirect('/admin/login')
      },
    },
  })

  return next()
}
