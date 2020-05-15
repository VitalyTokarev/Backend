const createError = require('http-errors');

exports.validateRequestBody = async (req, res, next) => {
    if (!req.body) { throw createError(400, 'Bad request'); }

    return next();
};

exports.validateRequestAuthorizationHeaders = async (req, res, next) => {
    if ( !req.headers.authorization ) {
        throw createError(400, 'Bad request'); 
    } 
    return next();
};