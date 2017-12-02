var Glue = require('glue');
var Hapi = require('hapi');

var internals = {
  manifest: {
    server: {
      connections: {
        routes: {
          cors: true
        }
      }
    },
    connections: [{
      port: 8088,
      labels: ['api']
    }],
    registrations: [
      {
        plugin: 'blipp'
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
                module: 'good-console'
              }, 'stdout']
            }
          }
        }
      },
      {
        plugin: './version'
      },
    ]
  }
}

Glue.compose(internals.manifest, { relativeTo: __dirname }, function (err, pack) {
  if (err) {
    console.log('server.register err:', err);
  }
  pack.start(function () {
    console.log('✅  Server is listening on ' + pack.info.uri.toLowerCase());
  });
});