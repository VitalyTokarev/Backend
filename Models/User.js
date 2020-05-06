const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Object = require('./Object'),
  asyncHandler = require('express-async-handler');

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

UserModelSchema.pre('remove', async function(next) {
  const objects = await Object.find({user: this._id});

  if ( objects.length === 0 ) { return next(); }

  for (object of objects) {
    object.remove();
  }
  return next();
});

module.exports = mongoose.model('User', UserModelSchema);