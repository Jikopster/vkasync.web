var http = require('http')
var Date = require(__dirname + '/date.js')

var proto = module.exports = function(locale) {
  this.locale = locale
}

proto = proto.prototype

proto.map = {
  en: '',
  ru: '.ru',
}

proto.get = function(listener) {
  var self = this
  var locale = this.locale || ''
  if (locale) locale = this.map[locale] || ''
  var domain = 'jikopster.vkasync'+locale
  var url = 'https://vk.com/' + domain
  function exception(text) {
    return new self.Result(new self.Exception(text), url)
  }
  var data = ''
  http.request(
    {
      host: 'api.vk.com',
      path: '/method/wall.get?v=5.45&owner=1&domain='+domain
    },
    function onResponse(res) {
      res.on('data', function(chunk) {
        data += chunk
      })
      res.on('error', function(error) {
        listener(exception('http error'))
      })
      res.on('end', function() {
        try {
          try {
            var json = JSON.parse(data)
          } catch (e) {
            throw exception('JSON error')
          }
          if (!json.response)
            throw exception('VK error')
          if (!json.response.count)
            throw exception('empty result')
          if (!json.response.items)
            throw exception('no items')
          var vkItems = json.response.items
          var items = []
          for (var i = 0; i < vkItems.length; i++) {
            var item = vkItems[i]
            if (!item.text) continue
            items.push(new self.Item(
              item.date,
              item.text,
              url + '?w=wall'+item.owner_id+'_'+item.id
            ))
          }
          listener(new self.Result(new self.Items(items), url))
        } catch (e) {
          listener(e)
        }
      })
    }
  ).end()
}

proto.Result = function(result, url) {
  this.result = result
  this.url = url
}

proto.Exception = function(text) {
  this.error = text
}

proto.Items = function(items) {
  this.items = items
}

proto.Item = function(date, text, url) {
  this.date = new Date(date)
  this.url = url
  this.text = text
}