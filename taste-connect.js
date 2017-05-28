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

var routes = {
  GET: {
    '/': function(req, res){
      res.end('hello, world!')
    },
    '/users': function(req, res){
      res.end('tobi, loki, ferret');
    },
    '/user/:id': function(req, res, id){
      res.end('user ' + id);
    }
  },
  DELETE: {
    '/user/:id': function(req, res, id){
      res.end('deleted user ' + id);
    }
  }
}

function restrict(req, res, next){
  var authorization = req.headers.authorization;
  if(!authorization) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
    return
  }

  var parts = authorization.split(' ')
  var auth = new Buffer(parts[1], 'base64').toString().split(':')
  var user = auth[0]
  var pass = auth[1]

  if (user === 'admin' && pass === 'admin'){
    return next()
  } else {
    return next(new Error('Password error!'))
  }
}

connect()
  .use(restrict)
  .use(router(routes))
  .listen(3000)
