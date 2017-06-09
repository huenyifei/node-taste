/*!
 * Module   : taste-express-api
 * Function : 学习express-api的用法
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/6/8
 */

var express = require('express')
var app = express()
var admin = express()
var router = express.Router()
var path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//必须写在前面，monut事件才能访问到app.locals.reqs的值
app.locals.reqs = 0
//还没有请求的时候回调函数就被调用了
admin.on('mount', function (parent) {
  console.log('Admin Mounted', parent.locals.reqs)
  console.log(parent.locals.reqs) // refers to the parent app
})

admin.locals.reqs = 100
// The mount event is fired on a sub-app, when it is mounted on a parent app.
// The parent app is passed to the callback function.
admin.get('/', function (req, res) {
  res.send('hello, admin')
})

admin.get('/id/:id', function (req, res, next) {
  res.write('id 1\n')
  next()
})

admin.get('/:name/:id', function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.write('id 2\n')
  next()
})

admin.get('/:name/:id', function name_id(req, res, next) {
  res.write('id 3\n')
  res.write('app.locals.reqs = ' + req.app.locals.reqs)

  res.write('req.baseUrl=' + req.baseUrl + ', 路由器的挂载路径\n')
  res.write('req.originalUrl =' + req.originalUrl + '，URL初始链接\n')
  res.write('req.params[0]=' + req.params[0] + '\n')
  res.write('req.params=' + JSON.stringify(req.params) + '\n')
  res.write('req.path=' + req.path + '\n')
  res.write('req.route=' + JSON.stringify(req.route) + '\n')
  res.end()
})
admin.param(['id', 'name'], function (req, res, next, value) {
  console.log('value = ' + value)
  next()
})

// 该路由使用的中间件
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// 定义网站主页的路由
router.get('/', function (req, res) {
  app.locals.reqs += 1
  res.render('index', {
    title: 'Photos',
    reqs: function reqs () {
      return app.locals.reqs
    }
  })
})

router.param(function (param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next()
    }
    else {
      next('route')
    }
  }
})
router.param('id', 1337)
router.get('/user/:id', function (req, res) {
  res.send('OK')
})

app.use('/', router)
app.use('/admin', admin)

app.listen(3000)