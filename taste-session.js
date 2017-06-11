/*!
 * Module   : taste-session
 * Function : 
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/6/5
 */

var express = require('express')
var session = require('express-session')

var app = express()
app.use(session({
  resave: true,
  rolling: true,
  saveUninitialized: true,
  secret: 'keyboard cat',
  cookie: {maxAge: 60000}
}))

// Access the session as req.session
app.get('/', function (req, res, next) {
  // req.session.view = 1
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.write('saveUninitialized设置为true\n')
  res.write('\t在没有cookie或则cookie过期情况下\n')
  res.write('\t\t忽略resave的值，都会保存session\n')
  res.write('\t\t忽略rolling的值，都会发送[Set-Cookie]头\n')
  res.write('\n')
  res.write('saveUninitialized设置为false\n')
  res.write('\t在没有cookie或则cookie过期且session没有变化的情况下\n')
  res.write('\t\t忽略resave的值，都不会保存session\n')
  res.write('\t\t忽略rolling的值，都不会发送[Set-Cookie]头\n')
  res.write('\n')
  res.write('其他情况下\n')
  res.write('\trolling的值，控制[Set-Cookie]头的发送\n')
  res.write('\tresave的值，控制session的保存')

  res.end()
})

app.listen(3000)