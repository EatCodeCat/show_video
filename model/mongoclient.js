var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var db = mongoose.connect('mongodb://127.0.0.1/mini_show_db');


module.exports = {

    getModel: function(schema, name) {
        return mongoose.model(name, mongoose.Schema(schema));
    },
    getSchema: function(schema) {
        return mongoose.Schema(schema);
    }
}