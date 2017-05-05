 var client = require('./mongoclient')
 var Schema = {
     'content_type': Number, // 1. 图文， 2. 图片集 3. 视频
     'detail_url': String,
     'list_url': String,
     'content': String,
     'warning_lv': Number,
     'title': String,
     'author': String,
     'thumbnail': Array,
     'mainPic': Array,
     'tag': Array,
     'from_website': String,
     'create_time': Date,
     'play_count': Number,
     'remark': String,
     desc: String,
     content_time: Date //来源内容创建时间
 }

 var Model = client.getModel(Schema, 'content');

 module.exports = {
     save: function(param) {
         param.create_time = new Date();
         return Model.create(param)
     },
     list: function(index, page, param) {
         if (!param) param = {};
         return Model.find(param).sort('-content_time').skip(index * page).limit(page);
     },
     getContentById: function(id) {
         return Model.findById(id);
     }

 }