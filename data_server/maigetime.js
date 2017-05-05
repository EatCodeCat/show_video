//爬取数据

var Client = require('./client');
var cheerio = require("cheerio")
var contentDao = require('../model/contentModel')


var host = 'https://wx.abbao.cn'

var client = new Client({"authority": "wx.abbao.cn", "scheme": "https", "referer": "https://wx.abbao.cn/wu/89d90ad43c9e4889.html",
cookie:'__cfduid=d6ba247ce04c41e697a314f8ae7b86f471493906917; Hm_lvt_58ea004dc0522057209aba54c622e023=1493906904; Hm_lpvt_58ea004dc0522057209aba54c622e023=1493906904; __utma=143276005.667657622.1493906905.1493906905.1493906905.1; __utmc=143276005; __utmz=143276005.1493906905.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); Hm_lvt_5a0dc5f0063da06a17d0ae7f64c9d1c6=1493909038; Hm_lpvt_5a0dc5f0063da06a17d0ae7f64c9d1c6=1493911728'})


function task_all(page) {

    if (page > 1) {
        var url = 'https://wx.abbao.cn/wu/89d90ad43c9e4889-' + page + '.html'
    } else {
        var url = 'https://wx.abbao.cn/wu/89d90ad43c9e4889.html'
    }

    client.get(url, function (err, res) {
           var $ = cheerio.load(res.text);
            var itemList = $(".uk-width-medium-3-4 .rel-articles  .article-item");
            var list = [];
            for (var index = 0; index < itemList.length; index++) {
                var element = itemList.eq(index);
                var a = element.find("h4 a");
                var title = a.text();
                var detailUrl = a.attr('href')
                var date = element.find('h4 .ext').text();
                var desc = element.find('.wx-news-ext').text();
                var thumbnail = element.find('.cover-wrap img').attr('data-src');
                if(date){
                    var m = date.match(/(\d+)月(\d+)日/)
                    if(m){
                        var now = new Date();
                        
                        var month = m[1];
                        var d = m[2];
                        now.setMonth(parseInt(month)  - 1);
                        now.setDate(d);
                        date = now;
                    }
                }

                if(!detailUrl.startsWith('https://') && !detailUrl.startsWith('http://')){
                    detailUrl  = host + detailUrl;
                }

                var arctile = {
                    title:title.replace(/\s+/g, ''),
                    thumbnail:thumbnail,
                    warning_lv:0,
                    desc:desc.replace(/\s+/g, ''),
                    author:'麦格时光',
                    content_time:date,
                    list_url:url,
                    detail_url:detailUrl,
                    from_website:host
                }
                ;(function (detailUrl, arctile){
                    client.get(detailUrl, function(err, res){
                        var $d = cheerio.load(res.text, {decodeEntities: false});
                        arctile.content = $d('#js_content').html();
                        contentDao.save(arctile);
                        console.log('save-' + detailUrl);
                    })
                })(detailUrl, arctile);
                
            }
        })
}
task_all(0)
