//爬取数据

var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    eventproxy = require('eventproxy');