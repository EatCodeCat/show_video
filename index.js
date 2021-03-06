var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session');


var apiRouter = require('./router/api')
var rootRouter = require('./router/root')

var app = express();
//ejs模板
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

//静态文件
app.use('/static', express.static(__dirname + '/static'));

app.use(bodyParser.json()); //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.use(session({
    secret: 'eat code cat',
    resave: false,
    saveUninitialized: true,

}))

app.use(cookieParser())

//api 接口
app.use('/api', apiRouter);
app.use(rootRouter);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});