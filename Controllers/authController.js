const argon2 = require('argon2'),
    createError = require('http-errors'),
    User = require('./../Models/User'),
    { 
        validateTokens,
        generateTokens,
        decodeTokens,
    } = require('../Services/actionsTokens');

exports.verifyLoginRequest = async (req, res, next) => {
    const authData = JSON.parse(req.headers.authorization).user;
    const email = decodeTokens(authData, ':', 0);
    const password = decodeTokens(authData, ':', 1);

    const user = await User.findOne({ email });
    if (!user) { throw createError(401, 'Введен неверный логин или пароль!'); }

    const correctPassword = await argon2.verify(user.password, password);

    if (!correctPassword) {
        throw createError(401, 'Введен неверный логин или пароль!');
    }

    req.user = user;
    return next();
};

exports.verifySignupRequest = async (req, res, next) => {
    const sameEmail = await User.findOne( { email: req.body.email });
    if (sameEmail) { throw createError(401, 'Пользователь с таким почтовым ящиком уже зарегистрирован!'); }

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

exports.verifyRefrshTokensRequest = async (req, res, next) => {
    const refreshToken = JSON.parse(req.headers.authorization).token;

    if (!req.cookies.accessToken 
        || !refreshToken 
        || !validateTokens(req.cookies.accessToken, refreshToken)
        ) { 

        throw createError(401, 'Autentication failed');
    }

    const userId = JSON.parse(decodeTokens(refreshToken, '.', 1)).data._id;
    const user = await User.findById(userId);

    if (!user && user.refreshToken !== refreshToken) { console.log('user find failed', user, user.refreshToken); throw createError(401, 'Authentication failed'); }

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
    .send(JSON.stringify(
        req.tokens.refresh,
    ));
};
