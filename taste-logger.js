/*!
 * Module   : taste-logger
 * Function : 学习中间件logger的使用
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/6/1
 */

var fs = require('fs')
var connect = require('connect')
var logger = require('morgan')
var path = require('path')

var logfile = fs.createWriteStream('./output.log', {flags: 'a'})
connect()
  .use(logger('[:date[iso]] ":method :url" :status :res[content-length] ":user-agent"'))
  // .use(logger('[:date[iso]] ":method :url" :status :res[content-length] ":user-agent"', {stream: logfile}))
  .use(function hello (req, res) {
    var str = 'Hello, world!'
    res.setHeader('Content-Length', Buffer.byteLength(str))
    res.end(str)
  })
  .listen(3000)

