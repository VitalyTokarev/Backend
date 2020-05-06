const argon2 = require('argon2'),
    createError = require('http-errors'),
    User = require('./../Models/User'),
    { 
        validateTokens,
        generateTokens,
    } = require('../Services/actionsTokens');

const decodeTokens = (token, splitParam = '.', index = 0) => {
    return Buffer.from(token.split(splitParam)[index], 'base64').toString();
};

exports.validateLoginRequest = async (req, res, next) => {
    if (!req.headers.authorization || !JSON.parse(req.headers.authorization).user) {
        throw createError(400, 'Bad request'); 
    } 

    return next();
};

exports.verifyLoginRequest = async (req, res, next) => {
    const authData = JSON.parse(req.headers.authorization).user;
    const email = decodeTokens(authData, ':', 0);
    const password = decodeTokens(authData, ':', 1);

    const user = await User.findOne({ email });
    if (!user) { throw createError(403, 'User not found'); }

    const correctPassword = await argon2.verify(user.password, password);

    if (!correctPassword) {
        throw createError(403, 'Incorrect password');
    }

    req.user = user;
    return next();
};

exports.validateSignupRequest = async (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.password || !req.body.name) { 
        throw createError(400, 'Bad request'); 
    }

    return next();
};

exports.verifySignupRequest = async (req, res, next) => {
    const sameEmail = await User.findOne( { email: req.body.email });
    if (sameEmail) { throw createError(403, 'Exist user with same email'); }

    return next();
};

exports.createNewUser = async (req, res, next) => {

    const  passwordHashed = await argon2.hash( req.body.password );
    
    const user = new User({
        password: passwordHashed,
        email: req.body.email,
        name: req.body.name,
        role: 'user',
    });

    req.user = user;
    return next();
};

exports.validateRefreshTokensRequest = async (req, res, next) => {
    if (!req.headers.authorization || !JSON.parse(req.headers.authorization).token) {
        throw createError(400, 'Bad request'); 
    }

    return next();
};

exports.verifyRefrshTokensRequest = async (req, res, next) => {
    const refreshToken = JSON.parse(req.headers.authorization).token;

    if (!req.cookies.accessToken 
        || !refreshToken 
        || !validateTokens(req.cookies.accessToken, refreshToken)
        ) { 
        throw createError(401, 'Authentification failed');
    }

    const userId = JSON.parse(decodeTokens(refreshToken, '.', 1)).data._id;
    const user = await User.findById(userId);

    if (!user && user.refreshToken !== refreshToken) { throw createError(403, 'Authentication failed'); }

    req.user = user;
    return next();
};

exports.setTokens = async (req, res, next) => {
    const tokens = generateTokens(req.user);
    req.user.refreshToken = tokens.refresh;

    req.user.save( err => {
        if (err) { return res.sendStatus(500); }
    });
    delete req.user;

    req.tokens = tokens;
    return next();
};


exports.sendRepsonse = async (req, res) => {
    res
    .cookie('accessToken', req.tokens.access, {
        httpOnly: true,
        maxAge: 3600 * 24 * 1000,
    })
    .send(JSON.stringify({
        token: req.tokens.refresh,
    }))
};
