/*!
 * Module   : taste-favicon
 * Function : 
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/6/1
 */

var connect = require('connect')
var favicon = require('serve-favicon')
var path = require('path')

var app = connect()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(function hello (req, res) {
  res.end('hello, world!')
})

app.listen(3000)