var express = require('express');
var app = express();

var apiRouter = require('./router/api')

//静态文件
app.use('/static', express.static(__dirname + '/static'));

//api 接口
app.use('/api', apiRouter);

//ejs模板
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);



app.get('/', function(req, res) {
    res.render('index.html')
});


app.get('/login', function(req, res) {
    res.render('login.html')
});

app.route('/regist').get(function(req, res) {
    res.render('regist.html')

}).post(function(req, res) {
    console.log(req.param)
});

app.get('/me', function(req, res) {
    res.render('me.html')
});

app.get('/video', function(req, res) {
    res.render('video.html')
});

app.get('/arctile', function(req, res) {
    res.render('arctile.html')
});

app.get('/detail/:id', function(req, res) {
    res.render('detail.html')
});




app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});