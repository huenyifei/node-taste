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
      'user = yue',
      // 写为 'grade = j:{math:67, english:82}'是不对的
      'grade = j:{"math":67, "english":82}',
      'age = s:' + signature.sign('twenty-one', secret),
    ])
    next()
  })
  .use(cookieParser(secret))
  .use(function hello (req, res) {
    console.log('解析Cookies: ', req.cookies)
    console.log('解析Signed Cookies: ', req.signedCookies)
    console.log('方法JSONCookie:', cookieParser.JSONCookie('j:{"math":67, "english":82}'))
    console.log('方法signedCookie: ', cookieParser.signedCookie('s:'+signature.sign('twenty-one', secret), secret))
    res.end()
  })
  .listen(3000)

