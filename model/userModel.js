 var client = require('./mongoclient')

 var Schema = {
     'uesrName': String,
     'nickname': String,
     'sex': Number,
     'password': String,
     'telphone': String,
     'email': String,
     'userId': String
 }

 var Model = client.getModel(Schema, 'user');




 module.exports = {
     save: function(param) {
         Model.create(param, function(err, small) {
             if (err) {
                 console.log(err);
             }
         })
     },
     fetchAll: function() {
         return Model.find();
     },

     checkUserName: function(name) {
         return Model.findOne({ uesrName: name });
     }
 }