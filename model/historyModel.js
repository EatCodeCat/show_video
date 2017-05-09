 var client = require('./mongoclient')
 var Schema = {
     'userId': String,
     'key': String,
     'search_time': String,
     'result': String
 }

 var Model = client.getModel(Schema, 'history');
 module.exports = {
     save: function(param) {
         return Model.create(param)
     },
     fetchAll: function() {
         return Model.find();
     },
     fetchHistoryByUserId: function(id) {
         return Model.find({ userId: name });
     }
 }