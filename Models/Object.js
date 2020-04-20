const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ObjectModelSchema = new Schema({
    _id: String,
    value: String,
    type: String,
    fruit: String
});

module.exports = mongoose.model('ObjectModel', ObjectModelSchema);