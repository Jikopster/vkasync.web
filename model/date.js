function pad(s) {
  s = s + ''
  return s.length < 2
    ? '0' + s
    : s
}

module.exports = function(seconds) { 
  var date = new Date(seconds * 1000)
  
  this.year = date.getFullYear()
  this.date = date.getDate()
  this.month = date.getMonth()
  
  this.toString = function() {
    return this.year+'-'+pad(this.month)+'-'+pad(this.date)
  }
}