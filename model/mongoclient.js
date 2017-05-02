var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var db = mongoose.connect('mongodb://localhost/test');


module.exports = {

    getModel: function(schema, name) {
        return mongoose.model('name', mongoose.Schema(schema));
    },
    getSchema: function(schema) {
        return mongoose.Schema(schema);
    }
}