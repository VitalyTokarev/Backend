require('dotenv');
const jwt = require('express-jwt');

const getTokenFromHeader = req => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
};

module.exports = jwt({
    secret: process.env.SECRET_KEY,
    userProperty: 'token', 
    getToken: getTokenFromHeader,
});


