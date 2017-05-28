/**
 * Module   : restrict
 * Function : Http basic认证中间件
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Created by Colin Wu on 2017/5/28.
 */

/**
 * Module exports.
 * Http basic认证
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 * @public
 */
module.exports = function restrict(req, res, next){
  var authorization = req.headers.authorization;
  if(!authorization) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  } else {
    var parts = authorization.split(' ')
    var auth = new Buffer(parts[1], 'base64').toString().split(':')
    var user = auth[0]
    var pass = auth[1]

    if (user === 'admin' && pass === 'admin') {
      next()
    } else {
      next(new Error('Password error!'))
    }
  }
}
