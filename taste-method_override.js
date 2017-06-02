/*!
 * Module   : taste-method_override
 * Function : 
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/6/1
 */

var logger = require('morgan')
var connect = require('connect')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

function edit (req, res, next) {
  if ('GET' != req.method) return next()
  res.setHeader('Content-Type', 'text/html')
  res.write('<form method="post" enctype="application/x-www-form-urlencoded">')
  res.write('<input type="hidden" name="_method" value="put" />')
  res.write('<input type="text" name="user[name]" value="Tobi" />');
  res.write('<button type="submit">Update</button>')
  res.write('</form>')
  res.end()
}

function update (req, res, next) {
  if ('PUT' != req.method) return next()
  res.end('Updated name to ' + req.body.user.name)
}

var app = connect()
  .use(bodyParser.urlencoded({extended:true}))
  .use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
  .use(edit)
  .use(update)

app.listen(3000)
