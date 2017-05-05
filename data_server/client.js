var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio")

function Client(options) {

    this.request = superagent;
    var headers = {
        "accept-encoding": "gzip, deflate, sdch, br",
        "accept-language": "zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,nb;q=0.2,sk;q=0.2,zh-TW;q=0.2",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)" +
                " Chrome/57.0.2987.98 Safari/537.36"
    }
    this.headers = Object.assign({}, headers, options);
}

Client.prototype.get = function (url, param, cb) {
    if(typeof param == 'function'){
        cb = param;
    }
    return this.request.get(url).set(this.headers).query(param).end(cb);
}

module.exports =Client
