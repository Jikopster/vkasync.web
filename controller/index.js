var VK = require(__dirname+'/../model/vk.js')

module.exports = function(req, res) {
  var locale = res.locals.locale
  var domain = 'jikopster.vkasync'
  var vk = new VK(locale, domain)
  vk.get({}, function(result) {
    res.render('index', { news: result })
  })
}