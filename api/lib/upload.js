var fsExtra = require('fs.extra');
var fs = require('fs');
var path = require('path');
var ASQ = require('asynquence');

exports.register = function (server, options, next) {

  server.route({
    method: 'POST',
    path: '/upload',
    config: {
      payload: {
        output: 'file',
        parse: true,
        maxBytes: 209715200,
        allow: 'multipart/form-data'
      }
    },
    handler: function (request, reply) {
      var filesCreated = [];
      var filePaths = [];

      for (var fileName in request.payload) {
        var fileData = request.payload[fileName]
        fileData.ext = path.extname(fileName)
        filesCreated.push({
          originalName: fileName,
          mediaPath: `/static/img/upload/${path.basename(fileData.path)}${fileData.ext}`
        });

        filePaths.push(fileData);
      }

      ASQ()
      .seq.apply(null, filePaths.map(copyFile))
      .then(function () {
        return reply(filesCreated);
      })
    }
  })

  return next()
}

function copyFile(file) {
  return ASQ(function (done) {
    var fileName = path.basename(file.path);
    var baseDir = './static/img/upload'
    var copyPath = path.join(baseDir, fileName) + file.ext

    fs.access(baseDir, fs.F_OK, (err) => {
      if (err) {
        fs.mkdir(baseDir)
      }

      fsExtra.copy(file.path, copyPath, { replace: true }, function (err) {
        if (err) { throw err; }
        //Ajusta as permissões do arquivo
        fsExtra.chmodSync(copyPath, '755');
        done(baseDir);
      });
    });

    // fs.copy(file, copyPath, { replace: false }, function(err) {
  });
}

exports.register.attributes = {
  name: 'upload',
  version: require('../package.json').version
};