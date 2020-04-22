const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ObjectModelSchema = new Schema({
    _id: String,
    value: { 
        type:String,
        required:true
    },
    type: { 
        type:String,
        required:true
    },
    fruit: { 
        type:String,
        required:true
    },
    user: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }]
});

module.exports = mongoose.model('ObjectModel', ObjectModelSchema);