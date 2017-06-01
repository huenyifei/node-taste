/*!
 * Module   : taste-node-web
 * Function : 使用Node原生模块创建web服务，完成以下功能：
 *              1. 提供静态文件服务
 *              2. 创建底层的RESTful web服务
 *              3. 接受用户通过HTML表单输入的数据
 *              4. 监测文件上传进度
 *              5. 使用Node安全套接字层（SSL）增强Web程序的安全性
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/5/31
 */

/**
 * Module dependencies
 * @private
 */
var http = require('http')
var parse = require('url').parse
var join = require('path').join
var fs = require('fs')
var qs = require('querystring')
var formidable = require('formidable')

var root = __dirname

var items = []

function show (res) {
  var html = '<html><head><title>Todo List</title></head><body>' +
    '<h1>Todo List</h1>' +
    '<ul>' +
    items.map(function (item) { return '<li>' + item + '</li>'}).join('') +
    '</ul>' +
    '<form method="post" action="/" >' +
    '<p><input type="text" name="item" /></p>' +
    '<p><input type="submit" value="Add Item" /></p>' +
    '</form>' +
    '<form method="post" action="/" enctype="multipart/form-data">' +
    '<p><input type="text" name="name" /></p>' +
    '<p><input type="file" name="file" /></p>' +
    '<p><input type="submit" name="Upload" /></p>' +
    '</form></body></html>'
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Content-Length', Buffer.byteLength(html))
  res.end(html)
}

function notFound (res) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('Not Found')
}

function badRequest (res) {
  res.statusCode = 400
  res.setHeader('Content-Type', 'text/plain')
  res.end('Bad Request')
}

function add (req, res) {
  var body = ''
  req.setEncoding('utf8')
  req.on('data', function (chunk) {body += chunk})
  req.on('end', function () {
    console.log(body, '***')
    var obj = qs.parse(body)
    items.push(obj.item)
    show(res)
  })
}

function isFormData(req){
  var type = req.headers['content-type']||''
  return 0 == type.indexOf('multipart/form-data')
}

var server = http.createServer(function (req, res) {
  if ('/' == req.url) {
    switch (req.method) {
      case 'GET':
        show(res)
        break
      case 'POST':
        if (isFormData(req)) {
          var form = new formidable.IncomingForm()
          form.parse(req, function (err, fields, files) {
            console.log(fields)
            console.log(files)
            res.end('upload complete!')
          })
        } else {
          add(req, res)
        }
        break
      default:
        badRequest(res)
    }
  } else {
    var url = parse(req.url)
    var path = join(root, url.pathname)
    fs.stat(path, function (err, stat) {
      if (err) {
        notFound(res)
      } else {
        res.setHeader('Content-Length', stat.size)
        res.setHeader('Content-Type', 'text/plain; charset="utf-8"')
        var stream = fs.createReadStream(path)
        stream.pipe(res)
        stream.on('error', function (err) {
          res.statusCode = 500
          res.end('Internal Server Error')
        })
      }
    })
  }
})
server.listen(3000)
