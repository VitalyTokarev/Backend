const createError = require('http-errors'),
    Object = require('../Models/Object'),
    User = require('../Models/User');

exports.validateRequest = async (req, res, next) => {
    if (!req.body) { throw createError(400, 'Bad request'); }

    return next();
};

exports.verifyUser = async (req, res, next) => {
    const user = await User.findById(req.token.data._id);
    if (!user) { throw createError(403, 'User is not found'); }

    req.currUser = user;
    return next();
};

exports.list = async (req, res) => {
    Object.find({ user: req.currUser ._id }, 'value type fruit').
    exec( (err, listObjects) => {
        if (err) { throw createError(500, err); }
    
        res.send(JSON.stringify(listObjects));
    });

};

exports.create = async (req, res) => {
    const {
        value,
        type,
        fruit,
    } = req.body;

    const object = new Object({
        value,
        type,
        fruit,
        user: req.currUser ._id
    });

    object.save( (err, object) => {
        if (err) { throw createError(500, err); }

        res.send(JSON.stringify(object._id));
    });
};

exports.update = async (req, res) => {
    const {
        _id,
        value,
        type,
        fruit,
    } = req.body;

    Object.findOneAndUpdate({ _id: _id, user: req.currUser._id }, 
        {
            value,
            type,
            fruit,
        }, 
        (err, user) => {
            if (err) { throw createError(404, err); }
            if (!user) {return res.sendStatus(404); }
            res.sendStatus(200);
        }
    );
};

exports.delete = async (req, res) => {
    Object.findOneAndDelete({ 
        _id: req.body.id,
        user: req.currUser._id
    }, 
    (err, user) => {
        if (err) { throw createError(500, err); }
        if(!user) { return res.sendStatus(404); }
        res.sendStatus(200);
    });
};


