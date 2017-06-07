/*!
 * Module   : taste-error-handler
 * Function : 学习error-handler用法
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/6/7
 */

/**
 * Module dependencies
 * @private
 */
var connect = require('connect')
var errorhandler = require('errorhandler')
var notifier = require('node-notifier')

function errorNotification(err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}

connect()
  .use(function error (req, res, next) {
    next(new Error('something broke!'))
  })
  .use(errorhandler({log: errorNotification}))
  .listen(3000)
