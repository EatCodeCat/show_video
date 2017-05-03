var express = require('express');
var rootRouter = express.Router();
var userDao = require('../model/userModel');

rootRouter.get('/', function(req, res) {
    res.render('index.html')
});


rootRouter.get('/login', function(req, res) {
    res.render('login.html')
});

rootRouter.route('/regist').get(function(req, res) {
    res.render('regist.html')

}).post(function(req, res) {
    console.log(req.param)
});

rootRouter.get('/me', function(req, res) {
    var userName = req.cookies.userName;
    userDao.fetchUserByUserName(userName).then(function(data, err) {
        if (err) {

        } else {
            var param = {}
            if (data) {
                param.isLogin = true;
                param.user = data;
            } else {
                param.isLogin = false;
            }
            res.render('me.html', param);
        }
    })
});

rootRouter.get('/video', function(req, res) {
    res.render('video.html')
});

rootRouter.get('/arctile', function(req, res) {
    res.render('arctile.html')
});

rootRouter.get('/detail/:id', function(req, res) {
    res.render('detail.html')
});

module.exports = rootRouter;