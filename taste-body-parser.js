/*!
 * Module   : taste-body-parser
 * Function : 学习body-parser的API
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/5/31
 */

/**
 * module dependencies
 * @private
 */
var logger = require('morgan')
var connect = require('connect')
var bodyParser = require('body-parser')

connect()
  .use(logger('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(function hello (req, res) {
    console.log(req.body)
    res.end(req.body.address)
  })
  .listen(3000)
