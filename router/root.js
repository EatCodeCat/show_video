var express = require('express');
var rootRouter = express.Router();
var userDao = require('../model/userModel');






function getUserBySession(userName, req, cb) {

    if (!req.session.user) {
        userDao.fetchUserByUserName(userName).then(function(data, err) {
            if (err) {
                console.error(err);
            } else {
                if (data) {
                    req.session.user = data;
                }
            }
            cb(req.session.user)
        })
    } else {
        cb(req.session.user)
    }

}

rootRouter.use(function(req, res, next) {
    var userName = req.cookies.userName;
    if (userName) {
        getUserBySession(userName, req, function(data) {
            next();
        })
    }
})


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
    var param = {}
    if (req.session.user) {
        param.isLogin = true;
        param.user = req.session.user;
    } else {
        param.isLogin = false;
    }
    res.render('me.html', param);
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