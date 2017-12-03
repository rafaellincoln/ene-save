const Glue = require('glue')
const Pug = require('pug')
const Path = require('path')

const internals = {
  manifest: {
    connections: [{
      port: 8000,
      labels: ['web'],
    }],
    registrations: [
      {
        plugin: 'blipp',
      },
      {
        plugin: {
          register: 'good',
          options: {
            ops: {
              interval: 60000,
            },
            reporters: {
              myConsoleReporter: [{
                module: 'good-console',
              }, 'stdout'],
            },
          },
        },
      },
      {
        plugin: 'inert',
      },
      {
        plugin: 'vision',
      },
      {
        plugin: {
          register: 'visionary',
          options: {
            engines: { pug: Pug },
            path: Path.join(__dirname, '../templates'),
            compileOptions: {
              pretty: false,
            },
          },
        },
      },
      {
        plugin: 'hapi-auth-cookie',
      },
      {
        plugin: './auth-cookie',
      },
      {
        plugin: './auth',
      },
      {
        plugin: './public',
      },
      {
        plugin: './static',
      },
      {
        plugin: './avatar',
      },
      {
        plugin: './protected',
      },
    ],
  },
}

Glue.compose(internals.manifest, { relativeTo: __dirname }, (err, pack) => {
  if (err) {
    console.log('server.register err:', err)
  }
  pack.start(() => {
    console.log(`✅  Server is listening on ${pack.info.uri.toLowerCase()}`)
  })
})
