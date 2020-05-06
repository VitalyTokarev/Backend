const argon2 = require('argon2'),
    createError = require('http-errors'),
    User = require('../Models/User');

exports.validateRequest = async (req, res, next) => {
    if (!req.body) { throw createError(400, 'Bad request'); }

    return next();
};

exports.checkRole =  requiredRole => {
    return async (req, res, next) => {
        const user = await User.findById(req.token.data._id);
        if (!user) { throw createError(403, 'User is not found'); }

        if ( user.role !== requiredRole ) { throw createError(403) }

        return next();
    }
}

exports.getUsers = async (req, res) => {
    User.find({}, 'name email role').
    exec( (err, listUsers) => {
        if (err) { return res.sendStatus(500); }
        
        res.send(JSON.stringify(listUsers));
    });

};

exports.createUser = async (req, res) => {
    const {
        name,
        email,          
        password,
    } = req.body;

    const passwordHashed = await argon2.hash( password );

    const user = new User({
        name,
        email,
        role: 'user',           
        password: passwordHashed,
    });

    user.save( (err, user) => {
        if (err) { return res.sendStatus(500); }

        res.send(JSON.stringify(user._id));
    });
};

exports.updateUser = async (req, res) => {
    const {
        _id,
        name,
        email,     
        password,
    } = req.body;

    const updateFileds = {
        name,
        email
    };

    if ( password ) {
        const passwordHashed = await argon2.hash( password );
        updateFileds.password = passwordHashed;
    }

    User.findByIdAndUpdate( _id, { ...updateFileds }, 
        (err, user) => {
            if (err) { return res.sendStatus(500); }
            if( !user ) { return res.sendStatus(404); }

            res.sendStatus(200);
        }
    );
};

exports.deleteUser = async (req, res, next) => {
    User.findByIdAndDelete( req.body.id, 
    (err, user) => {
        if (err) { return res.sendStatus(500); }
        if(!user) { return res.sendStatus(404); }
        res.sendStatus(200);
    });
};