const jwt = require('express-jwt');

const getAccessToken = req => {
    return req.cookies.accessToken;
  };
  
module.exports = jwt({
      secret: process.env.SECRET_KEY,
      userProperty: 'token', 
      getToken: getAccessToken,
});