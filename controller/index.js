var News = require(__dirname+'/../model/news.js')

module.exports = function(req, res) {
  var locale = res.locals.locale
  var news = new News(locale)
  news.get(function listener(obj) {
    res.render('index', obj)
  })
}