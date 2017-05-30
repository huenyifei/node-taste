/**
 * Module   : router
 * Function : 构建路由中间件组件
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Created by Colin Wu on 2017/5/28.
 */

/**
 * Module dependencies
 * @private
 */
var parse = require('url').parse

/**
 * Module exports.
 * 根据Http方法和路径调用对应的回调函数
 *
 * @param {object} obj, 定义HTTP谓词、请求URL和回调函数的映射
 * @example
 * {
 *   GET: {
 *     '/users': function(req, res){ ... },
 *     '/user/:id': function(req, res, id){ ... }
 *   },
 *   ...
 * }
 *
 * @returns {Function}
 * @public
 */
module.exports = function route (obj) {
  return function (req, res, next) {
    if (!obj[req.method]) {
      next()
      return
    }
    var routes = obj[req.method]
    var url = parse(req.url)
    var paths = Object.keys(routes)

    for (var i = 0; i < paths.length; i++) {
      var path = paths[i]
      var fn = routes[path]
      path = path
        .replace(/\//g, '\\/')
        .replace(/:(\w+)/g, '([^\\/]+)')
      var re = new RegExp('^' + path + '$')
      var captures = url.pathname.match(re)
      if (captures) {
        var args = [req, res].concat(captures.slice(1))
        fn.apply(null, args)
        return
      }
    }
    next()
  }
}
