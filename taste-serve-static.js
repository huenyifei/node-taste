/*!
 * Module   : taste-serve-static
 * Function : 学习serve-static中间件
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/6/7
 */

var express = require('express')
var serveStatic = require('serve-static')

var app = express()

app.use(serveStatic('public', {'index': ['index.html', 'index.htm']}))
app.listen(3000)
