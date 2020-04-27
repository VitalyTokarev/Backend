require('dotenv').config();

const jwt = require('jsonwebtoken'),
  jwtExpress = require('express-jwt');

createRandomString = () => {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz';

  for(let i=0; i <10; i++) {
    text += possible.charAt(Math.floor(Math.random()*possible.length));
  } 

  return text;
};

const generateAccessToken = user => {
  return jwt.sign({
    data: {
      _id: user._id,        
      name: user.name,
    }
  }, process.env.SECRET_KEY, { expiresIn: '30m' });
};

const generateRefreshToken = accessToken => {
  return (
    createRandomString() 
    + accessToken.substr(accessToken.length - 5, accessToken.length)
    +'.'
    + accessToken.split('.')[1]
    );
};

exports.validateTokens = (acces, refresh) => {
  const refreshFirstPart = refresh.split('.')[0];

  if ( acces.substr(acces.length - 5, acces.length) 
  === refreshFirstPart.substr(refreshFirstPart.length - 5, refreshFirstPart.length) ) 
  {
    return true;
  }

  return false;
};

exports.generateTokens = user => {
    const access = generateAccessToken(user);
    const refresh = generateRefreshToken(access);

    return { access, refresh }
};

const getAccessToken = req => {
  return req.cookies.accessToken;
};

exports.authToken = jwtExpress({
    secret: process.env.SECRET_KEY,
    userProperty: 'token', 
    getToken: getAccessToken,
});
