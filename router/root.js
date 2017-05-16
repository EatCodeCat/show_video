var express = require('express')
var rootRouter = express.Router()
var userDao = require('../model/userModel')
var contentDao = require('../model/contentModel')
var imageDao = require('../model/imageModel')

// 保持登录状态
function getUserBySession (userName, req, cb) {
  if (!req.session.user) {
    userDao.fetchUserByUserName(userName)
      .then(function (data, err) {
        if (err) {
          console.error(err)
        } else {
          if (data) {
            req.session.user = data
          }
        }
        cb(req.session.user)
      })
  } else {
    cb(req.session.user)
  }
}

rootRouter.use(function (req, res, next) {
  var userName = req.cookies.userName
  if (userName) {
    getUserBySession(userName, req, function (data) {
      next()
    })
  } else {
    var _id = req.cookies._id
    if (_id) {
      next()
    } else {
      userDao.createVirtalUser().then(function (data) {
        var expires = { expires: new Date(Date.now() + 3600 * 1000 * 60 * 60 * 24) }
        res.cookie('_id', data._id.toString(), expires)
        next()
      })
    }
  }
})

rootRouter.get('/', function (req, res) {
  contentDao.list(0, 30).then(function (data, err) {
    res.render('index.html', { list: data })
  })
})

rootRouter.get('/login', function (req, res) {
  res.render('login.html')
})

rootRouter
  .route('/regist')
  .get(function (req, res) {
    res.render('regist.html')
  })
  .post(function (req, res) {
    console.log(req.param)
  })

rootRouter.get('/me', function (req, res) {
  var param = {}
  if (req.session.user) {
    param.isLogin = true
    param.user = req.session.user
  } else {
    param.isLogin = false
  }
  res.render('me.html', param)
})

rootRouter.get('/search', function (req, res) {
  res.render('search.html')
})

rootRouter.get('/video', function (req, res) {
  res.render('video.html')
})

rootRouter.get('/arctile', function (req, res) {
  res.render('arctile.html')
})
rootRouter.get('/flag', function (req, res) {
  imageDao.list(0, 50).then(function (data, err) {
    var list = [];
    
    if(err) console.error(err);
    // var temp = [];
    // for(var i = 0; i <data.length; i++){
    //     if(i % 9==0){
    //         if(temp.length == 0)
    //             temp = [[data[i]]]
    //         else{
    //              temp.push([[data[i]]])
    //         }
    //     }
    //     else{
    //         temp[temp.length - 1].push(data[i]);
    //     }
    // }
    res.render('flag.html', {list:data});
  })
})

rootRouter.get('/detail/:id', function (req, res) {
  var id = req.param('id')
  contentDao.getContentById(id)
    .then(function (data) {
      res.render('detail.html', { content: data })
    })
})

module.exports = rootRouter
