/*!
 * Module   : taste-express
 * Function : 学习express的使用
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/6/7
 */

var express = require('express')
var app = express()

app.get('/', function(req, res){
  res.send('Hello')
})

app.listen(3000)