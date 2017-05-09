 var client = require('./mongoclient')

 var Schema = {
     'userName': String,
     'nickname': String,
     'sex': Number,
     'password': String,
     'telphone': String,
     'email': String,
     'userId': String,
     avatar: String
 }

 var Model = client.getModel(Schema, 'user');
 module.exports = {
     save: function(param) {
         return Model.create(param)
     },
     fetchAll: function() {
         return Model.find();
     },

     checkUserName: function(name) {
         return Model.findOne({ userName: name });
     },
     findById: function(id) {
         return Model.findById(id);
     },
     login: function(name, password) {
         return Model.findOne({ userName: name, password: password });
     },
     fetchUserByUserName: function(name) {
         return Model.findOne({ userName: name });
     },
     createVirtalUser: function() {
         return Model.create({
             'userName': '',
             'nickname': '',
             'sex': 0,
             'password': '',
             'telphone': '',
             'email': '',
             'userId': '',
             avatar: ''
         })
     }
 }