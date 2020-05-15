const createError = require('http-errors'),
    User = require('../Models/User');

module.exports =  requiredRole => {
    return async (req, res, next) => {
        if ( req.currUser.role !== requiredRole ) { throw createError(403) }

        return next();
    }
};

