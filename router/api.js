var express = require('express')
var apiRouter = express.Router()

var userDao = require('../model/userModel')
var contentDao = require('../model/contentModel')
var historyDao = require('../model/historyModel')
const crypto = require('crypto')
var imageDao = require('../model/imageModel')

const secret = 'abcdefg'

function setResult (data, res) {
  if (data) {
    res.json({ code: 1 })
  } else {
    res.json({ code: 0 })
  }
}

apiRouter.get('/user/noexist/:username', function (req, res) {
  userDao.checkUserName(req.param('username')).then(function (data, err) {
    if (err) {
      console.error(err)
    } else {
      if (data) {
        res.json({ code: 1 })
      } else {
        res.json({ code: 0 })
      }
    }
  })
})

apiRouter.post('/user/login', function (req, res) {
  var param = req.body
  param.password = crypto.createHmac('sha256', secret)
    .update(param.password)
    .digest('hex')
  userDao.login(param.userName, param.password).then(function (data, err) {
    if (err) {
      console.error(err)
    } else {
      if (data) {
        var expires = { expires: new Date(Date.now() + 3600 * 1000 * 60 * 60 * 24) }
        res.cookie('userName', data.userName, expires)
        res.cookie('nickname', data.nickname, expires)
        res.cookie('_id', data._id, expires)
        req.session.user = data
        res.json({ code: 0 })
      } else {
        res.json({ code: 1, msg: '账户或者密码错误' })
      }
    }
  })
})

apiRouter.get('/user/outlogin', function () {
  req.session.user = null
  res.json({ code: 0 })
})

apiRouter.post('/user/save', function (req, res) {
  var param = req.body
  userDao.checkUserName(param.userName).then(function (data, err) {
    if (data) {
      res.json({ code: 1, msg: '用户名已经存在' })
    } else {
      param.password = crypto.createHmac('sha256', secret)
        .update(req.body.password)
        .digest('hex')
      userDao.save(req.body).then(function (data, err) {
        if (err) {
          console.error(err)
          res.json({ code: 1 })
        } else {
          res.json({ code: 0 })
        }
      })
    }
  })
})

apiRouter.get('/content/list/:pageIndex', function (req, res) {
  contentDao.list(req.param('pageIndex') || 0, 30).then(function (data, err) {
    var list = []
    data.forEach(function (item) {
      list.push({ _id: item._id, title: item.title, thumbnail: item.thumbnail })
    })
    res.json(list)
  })
})
apiRouter.get('/image/list/:pageIndex', function (req, res) {
  imageDao.list(req.param('pageIndex') || 0, 30).then(function (data, err) {
    var temp = []
    for (var i = 0; i < data.length; i++) {
      if (i % 9 == 0) {
        if (temp.length == 0)
          temp = [[data[i]]]
        else {
          temp.push([[data[i]]])
        }
      }else {
        temp[temp.length - 1].push(data[i])
      }
    }
    res.json(temp)
  })
})

apiRouter.get('/history/userid/:userId', function (req, res) {
  historyDao.fetchHistoryByUserId(req.param('userId')).then(function (data, err) {
    var list = []
    data.forEach(function (item) {
      list.push({ _id: item._id, title: item.title, thumbnail: item.thumbnail })
    })
    res.json(list)
  })
})

module.exports = apiRouter
