//爬取数据

var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
     cheerio = require("cheerio")
    // eventproxy = require('eventproxy');

superagent.get("https://wx.abbao.cn/wu/89d90ad43c9e4889.html").end(function(err,res){
    $ = cheerio.load(res.text);
});




