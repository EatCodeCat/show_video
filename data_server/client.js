var http = require('http'),
  url = require('url'),
  superagent = require('superagent'),
  cheerio = require('cheerio')
var Progress = require('./LogProgress')

function Client (options) {
  this.request = superagent
  var headers = {
    'accept-encoding': 'gzip, deflate, sdch, br',
    'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,nb;q=0.2,sk;q=0.2,zh-TW;q=0.2',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)' +
      ' Chrome/57.0.2987.98 Safari/537.36'
  }
  this.headers = Object.assign({}, headers, options)
}

var process = new Progress()

Client.prototype.get = function (url, cb) {
  process.doing(url)
  return this.request.get(url).timeout({
    response: 10000, // Wait 5 seconds for the server to start sending,
    deadline: 60000, // but allow 1 minute for the file to finish loading.
  }).set(this.headers).end(function (err, res) {
    process.complate(url)
    cb(err, res)
  })
}

module.exports = Client
