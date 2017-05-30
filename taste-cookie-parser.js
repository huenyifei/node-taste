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
var signature = require('cookie-signature');

connect()
  .use(function(req, res, next){
    res.setHeader('Set-Cookie', ['foo = s:'+signature.sign('bar', 'nihao')])
    next()
  })
  .use(cookieParser('nihao'))
  .use(function hello(req, res){
    console.log('Cookies: ', req.cookies)
    console.log('Signed Cookies: ', req.signedCookies)
    res.end()
  })
  .listen(3000)

