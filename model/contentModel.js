var Schema = {
    'content_type': Number,
    'content_url': String,
    'from_url': String,
    'content': String,
    'warning_lv': int,
    'title': String,
    'author': String,
    'thumbnail': Array,
    'mainPic': Array,
    'tag': Array,
    'from_website': String,
    'create_tiem': Date,
    'play_count': Number,
    'remark': String
}

var Model = client.getModel(Schema, 'content');

module.exports = {

}