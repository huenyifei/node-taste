/*!
 * Module   : photos.js
 * Function : 
 * Project  : node-taste
 * License  : Copyright © 2017 Shanghai Zhenhua Heavy Industries Co., Ltd. All rights reserved
 * Author   : Create by Colin Wu on 2017/6/8
 */

var Photo = require('../models/Photo')
var path = require('path')
var fs = require('fs')
var mv = require('mv')
var join = path.join

var photos = [
  {
    name: 'Node.js Logo',
    path: 'nodejs-green.png'
  },
  {
    name: 'Ryan Speaking',
    path: 'ryan-speaker.png'
  }
]

// exports.list = function (req, res) {
//   res.render('photos', {
//     title: 'Photos',
//     photos: photos
//   })
// }

exports.list = function (req, res, next) {
  Photo.find({}, function (err, photos) {
    if (err) return next(err)
    res.render('photos', {
      title: 'Photos',
      photos: photos
    })
  })
}

exports.form = function (req, res) {
  res.render('photos/upload', {
    title: 'Photo upload'
  })
}

exports.submit = function (dir) {
  return function (req, res, next) {
    var img = req.files.photo.image
    var name = req.body.photo.name || img.name
    var path = join(dir, img.name)

    mv(img.path, path, function (err) {
      if (err) return next(err)

      Photo.create({
        name: name,
        path: img.name
      }, function (err) {
        if (err) return next(err)
        res.redirect('/')
      })
    })

  }
}

exports.download = function(dir){
  return function(req, res, next){
    var id = req.params.id;
    Photo.findById(id, function(err, photo){
      if (err) return next(err);
      var path = join(dir, photo.path);
      res.sendfile(path, photo.name+'.jpeg');
    });
  };
};