/**
 * Module   : taste-cookie-parser
 * Function : 学习cookie-parser使用方法
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Created by Colin Wu on 2017/5/30.
 */

/**
 * module dependencies
 * @private
 */
var connect = require('connect')
var cookieParser = require('cookie-parser')
var signature = require('cookie-signature')

secret = 'yueyingxie'

connect()
  .use(function (req, res, next) {
    res.setHeader('Set-Cookie', [
      'user = s:' + signature.sign('yue', secret),
      'age = s:' + signature.sign('yue', secret),
    ])
    next()
  })
  .use(cookieParser(secret))
  .use(function hello (req, res) {
    console.log('Cookies: ', req.cookies)
    console.log('Signed Cookies: ', cookieParser.signedCookie('s:yue.0tMA6mtW0lNe76R8PbnQpL+G8yLqqB3lI1dOsAkhcbQ', secret))
    res.end()
  })
  .listen(3000)

