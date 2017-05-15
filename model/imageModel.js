var client = require('./mongoclient')
 var Schema = {
     'list_url': String,
     'warning_lv': Number,
     'title': String,
     'author': String,
     'thumbnail': String,
     'mainPic': String,
     'tag': Array,
     'from_website': String,
     'create_time': Date,
     'play_count': Number,
     'desc': String,
     'content_time': Date //来源内容创建时间
 }

  var Model = client.getModel(Schema, 'image_content');

 module.exports = {

     list: function(index, page, param) {
         if (!param) param = {};
         return Model.find(param).sort('-content_time').skip(index * page).limit(page);
     },
 }


