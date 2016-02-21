var express = require('express')
var i18n = require('cloud/i18n-parse/i18n')

var app = express()

var locales = ['en','ru']
i18n.expressBind(app, { locales: locales })

app.set('views', 'cloud/views')
app.set('view engine', 'jade')

app.use(express.bodyParser())
app.use(express.cookieParser())

app.use(function(req, res, next) {
  var i18n = req.i18n
  if (req.query.lang) {
    res.cookie(i18n.cookieName, req.query.lang, { maxAge: 60*60*24*365*5 })
    i18n.setLocaleFromQuery()
  } else {
    i18n.setLocale(i18n.preferredLocale())
    i18n.setLocaleFromCookie()
  }
  app.locals.locale = i18n.locale
  app.locals.locales = locales
  next()
})

app.get('/', function(req, res) {
  res.render('index')
})

app.listen()
