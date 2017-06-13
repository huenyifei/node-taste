var http = require('http')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

// var index = require('./routes/index')
var users = require('./routes/users')
var entries = require('./routes/entries')

var register = require('./routes/register')
var messages = require('./lib/messages')
var login = require('./routes/login')
var user = require('./lib/middleware/user')
var validate = require('./lib/middleware/validate')
var page = require('./lib/middleware/page')
var Entry = require('./lib/entry')
var api = require('./routes/api')

var app = express()

// view engine setup
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
  resave: true,
  rolling: true,
  saveUninitialized: true,
  secret: 'keyboard cat',
  // cookie: {maxAge: 60000}
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', api.auth)
app.use(user)
app.use(messages)

app.use('/users', users)

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.get('/register', register.form)
app.get('/login', login.form)
app.get('/logout', login.logout)
app.get('/post', entries.form)

app.post('/login', login.submit)
app.post('/register', register.submit)
app.post('/post',
  validate.required('entry[title]'),
  validate.lengthAbove('entry[title]', 4),
  entries.submit)

app.get('/:page?', page(Entry.count, 5), entries.list)
app.get('/api/user/:id', api.user)
app.get('/api/entries/:page?', page(Entry.count, 5), api.entries)

app.post('/api/entry', entries.submit)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app
