require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = user => {
    return jwt.sign({
      data: {
        _id: user._id,        
        name: user.name,
        email: user.email
      }
    }, process.env.SECRET_KEY, { expiresIn: '6h' });
}