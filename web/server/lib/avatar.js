// const Joi = require('joi')
const fs = require('fs')
const path = require('path')
const Request = require('request')
const fsExtra = require('fs.extra')
const version = require('../../package.json').version

const baseDirIMG = 'public/images'
const baseDir = `${baseDirIMG}/avatars`

const internals = {}

exports.register = (server, options, next) => {
  server.dependency('AuthCookie', internals.after)
  return next()
}

exports.register.attributes = {
  name: 'avatar',
  version,
}

internals.after = (server, next) => {
  server.route({
    method: 'GET',
    path: '/avatar',
    config: {
      description: 'Transporta o avatar do shared point para o projeto local',
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private',
      },
      auth: { strategy: 'session', mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: false } },
      handler: (request, reply) => {
        const email = request.query.email
        const pathFile = path.join(baseDir, `${email}.jpg`)
        try {
          const stats = fs.statSync(pathFile)
          return reply.file(pathFile)
        } catch (e) {}

        fs.access(baseDirIMG, fs.F_OK, (err) => {
          if (err) {
            fs.mkdir(baseDirIMG)
          }
        })

        fs.access(baseDir, fs.F_OK, (err) => {
          if (err) {
            fs.mkdir(baseDir)
          }
        })

        return Request.get({ url: `http://www.movimentogsg.com.br/userAvatar?email=${email}&simple=1`, encoding: 'binary' }, (err, response, body) => {
          fs.writeFile(pathFile, body, 'binary', (err) => {
            if (err) {
              console.log(err)
              throw err
            }
            fsExtra.chmodSync(pathFile, '775')
            reply.file(pathFile)
          })
        })
      },
    },
  })

  return next()
}
