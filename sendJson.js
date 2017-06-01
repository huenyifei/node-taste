/*!
 * Module   : sendJson
 * Function : 相当于 curl -d '{"address":"testJson@test.com","subject":"test"}' -H "Content-Type: application/json"  http://localhost:3000
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/6/1
 */

var http = require('http')

var data = {
  address: 'testJson@test.com',
  subject: 'test'
}

data=JSON.stringify(data)
console.log(data)

var opt = {
  method: 'POST',
  host: 'localhost',
  port: 3000,
  path: '/',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

var req = http.request(opt, function (res) {
  if (res.statusCode == 200) {
    var body = ''
    res.on('data', function (data) { body += data })
      .on('end', function () { console.log(body) })
  }
})
req.write(data + '\n')
req.end()