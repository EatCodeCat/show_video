var express = require('express');
var apiRouter = express.Router();

var userDao = require('../model/userModel');




apiRouter.use('/check_user_noexist/:username', function(req, res) {

    userDao.checkUserName(req.param.username).then(function(data, err) {

        if (err) {
            console.error(err);
        } else {
            console.log(data);

            if (data) {
                res.json({ code: 1 })
            } else {
                res.json({ code: 0 })
            }

        }

    })

})

module.exports = apiRouter;