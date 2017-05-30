/**
 * Module   : taste-connect
 * Function :
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Created by Colin Wu on 2017/5/27.
 */

/**
 * Module dependencies
 * @private
 */
var connect = require('connect')
var router = require('./lib/router.js')
var restrict = require('./lib/restrict.js')

var routes = {
  GET: {
    '/': function (req, res) {
      res.end('hello, world!')
    },
    '/users': function (req, res) {
      res.end('tobi, loki, ferret')
    },
    '/user/:id': function (req, res, id) {
      res.end('user ' + id)
    }
  },
  DELETE: {
    '/user/:id': function (req, res, id) {
      res.end('deleted user ' + id)
    }
  }
}

function hello(req, res){
  res.end('Hello, world!')
}

connect()
  .use(restrict)
  .use('/admin', router(routes))
  .use(hello)
  .listen(3000)
