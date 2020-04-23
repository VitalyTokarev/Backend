const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  name: {
    type: String
  },
  
  email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
  },
      
  password: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserModelSchema);