const sendNotification = function (data) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Basic NzNmZTAyNDAtNDM5MC00ZjE3LWEzNTYtMWU0YjZkMjg4YzYz"
  }

  const options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  }

  data.app_id = 'bec1a4a4-0e7a-482e-938b-3dc470e142ce'
  data.contents = { en: 'Nova chamada' }

  const https = require('https')
  const req = https.request(options, function (res) {
    res.on('data', function (data) {
      console.log("Response:")
      console.log(JSON.parse(data))
    })
  })

  req.on('error', function (e) {
    console.log("ERROR:")
    console.log(e)
  })

  req.write(JSON.stringify(data))
  req.end()
}

exports.sendNotification = sendNotification
