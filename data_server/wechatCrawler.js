var host = 'http://wx.abbao.cn'

var Client = require('./client')
var cheerio = require('cheerio')
var contentDao = require('../model/contentModel')
var Progress = require('./LogProgress')

var headers = {
  'referer': 'http://wx.abbao.cn/wu/89d90ad43c9e4889.html',
  'Host': 'wx.abbao.cn',
  'Upgrade-Insecure-Requests': 1,
  cookie: '__cfduid=d6ba247ce04c41e697a314f8ae7b86f471493906917; Hm_lvt_58ea004dc0522057209aba54c622e023=1493906904; Hm_lpvt_58ea004dc0522057209aba54c622e023=1493906904; __utma=143276005.667657622.1493906905.1493906905.1493906905.1; __utmc=143276005; __utmz=143276005.1493906905.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); Hm_lvt_5a0dc5f0063da06a17d0ae7f64c9d1c6=1493909038; Hm_lpvt_5a0dc5f0063da06a17d0ae7f64c9d1c6=1493911728'
}

function webchatCrawler (url, author, warning_lv, curIndex, saveCallBack) {
  headers.referer = url
  var client = new Client(headers)
  client.get(url, function (err, res) {
    if (err) {
      console.error(err)
      console.log('报错-----' + detailUrl)
      return
    }
    var $ = cheerio.load(res.text)
    var itemList = $('.uk-width-medium-3-4 .rel-articles  .article-item')
    var list = []
    var progress = new Progress(author + '详情页(' + curIndex + ')', itemList.length)
    for (var index = 0, len = itemList.length; index < len; index++) {
      var element = itemList.eq(index)
      var a = element.find('h4 a')
      var title = a.text()
      var detailUrl = a.attr('href')
      var date = element.find('h4 .ext').text()
      var desc = element.find('.wx-news-ext').text()
      var thumbnail = element.find('.cover-wrap img').attr('data-src')
      if (date) {
        var m = date.match(/(\d+)月(\d+)日/)
        var now = new Date()
        if (m) {
          var month = m[1]
          var d = m[2]
          now.setMonth(parseInt(month) - 1)
          now.setDate(d)
          date = now
        } else {
          m = date.match(/(\d+)小时前/)
          if (m) {
            var h = m[1]
            now.setHours(h)
            date = now
          }
        }
        date = now
      }

      if (!detailUrl.startsWith('https://') && !detailUrl.startsWith('http://')) {
        detailUrl = host + detailUrl
      }

      var arctile = {
        content_type: 1,
        title: title.replace(/\s+/g, ''),
        thumbnail: thumbnail,
        warning_lv: warning_lv || 0,
        desc: desc.replace(/\s+/g, ''),
        author: author,
        content_time: date,
        list_url: url,
        detail_url: detailUrl,
        from_website: host
      }
      ;(function (detailUrl, arctile, total, curIndex) {
        headers.referer = detailUrl
        var client = new Client(headers)
        client.get(detailUrl, function (err, res) {
          if (err) {
            console.error(err)
            console.log('报错-----' + detailUrl)
            return;
          }
          else if (res) {
            var $d = cheerio.load(res.text, { decodeEntities: false })
            arctile.content = $d('#js_content').html()
            contentDao.save(arctile)
            progress.log(detailUrl)
          }else {
            console.log('报错-----' + detailUrl)
          }
        })
      })(detailUrl, arctile, len, index)
    }
    if (typeof saveCallBack == 'function') {
      saveCallBack(arctile, url)
    }
  })
}

function crawleAllMaigeTime () {
  // 麦格时光
  for (var i = 0; i < 23; i++) {
    if (i > 1) {
      var url = 'http://wx.abbao.cn/wu/89d90ad43c9e4889-' + i + '.html'
    } else {
      var url = 'http://wx.abbao.cn/wu/89d90ad43c9e4889.html'
    }
    var progress = new Progress('麦格时光列表', 23, 0)
    webchatCrawler(url, '麦格时光', 0, i, function (data, url) {
      progress.log(url)
    })
  }
}

function crawleAllNeiHanGIF () {
  for (var i = 1; i <= 91; i++) {
    if (i > 1) {
      var url = 'http://wx.abbao.cn/wu/af10ca0262f48f56-' + i + '.html'
    } else {
      var url = 'http://wx.abbao.cn/wu/af10ca0262f48f56.html'
    }
    var progress = new Progress('内涵GIF列表', 91, 0)
    webchatCrawler(url, '内涵GIF', 1, i, function (data, url) {
      progress.log(url)
    })
  }
}

module.exports = {
  crawleAllMaigeTime,
crawleAllNeiHanGIF}
