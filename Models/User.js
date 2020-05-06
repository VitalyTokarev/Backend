const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Object = require('./Object');

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

  role: {
    type:String,
    required: true,
  },
      
  password: {
    type: String,
    required: true,
  },

  refreshToken: {
    type: String,
  }
});

UserModelSchema.pre('findOneAndDelete', function(next) {
  Object.deleteMany({ user: this.getQuery()._id}, err => {
    if(err) { return next(err); }
  });

  return next();
});
module.exports = mongoose.model('User', UserModelSchema);