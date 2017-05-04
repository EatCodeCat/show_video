var express = require('express');
var apiRouter = express.Router();

var userDao = require('../model/userModel');

const crypto = require('crypto');

const secret = 'abcdefg';



function setResult(data, res) {
    if (data) {
        res.json({ code: 1 })
    } else {
        res.json({ code: 0 })
    }
}


apiRouter.get('/user/noexist/:username', function(req, res) {
    userDao.checkUserName(req.param('username')).then(function(data, err) {
        if (err) {
            console.error(err);
        } else {
            if (data) {
                res.json({ code: 1 })
            } else {
                res.json({ code: 0 })
            }
        }
    })
})
apiRouter.post('/user/login', function(req, res) {

    var param = req.body;
    param.password = crypto.createHmac('sha256', secret)
        .update(param.password)
        .digest('hex');
    userDao.login(param.userName, param.password).then(function(data, err) {
        if (err) {
            console.error(err);
        } else {
            if (data) {
                res.cookie('userName', data.userName, { expires: new Date(Date.now() + 30 * 1000 * 60 * 60 * 24) });
                res.cookie('nickname', data.nickname, { expires: new Date(Date.now() + 30 * 1000 * 60 * 60 * 24) });
                req.session.user = data;
                res.json({ code: 0 })
            } else {
                res.json({ code: 1, msg: '账户或者密码错误' })
            }
        }
    })
})

apiRouter.post('/user/save', function(req, res) {
    var param = req.body;
    userDao.checkUserName(param.userName).then(function(data, err) {

        if (data) {
            res.json({ code: 1, msg: '用户名已经存在' })
        } else {
            param.password = crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex');
            userDao.save(req.body).then(function(data, err) {
                if (err) {
                    console.error(err);
                    res.json({ code: 1 })
                } else {
                    res.json({ code: 0 })
                }
            })
        }


    })
})

module.exports = apiRouter;