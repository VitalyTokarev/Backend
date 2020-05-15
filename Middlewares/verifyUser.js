const createError = require('http-errors'),
    User = require('../Models/User');

module.exports = async (req, res, next) => {
    const user = await User.findById(req.token.data._id);
    if (!user) { throw createError(403, 'User is not found'); }

    req.currUser = user;
    return next();
};