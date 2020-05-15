const argon2 = require('argon2'),
    User = require('../Models/User');

exports.getAll = async (req, res) => {
    User.find({}, 'name email role').
    exec( (err, listUsers) => {
        if (err) { return res.sendStatus(500); }
        
        res.send(JSON.stringify(listUsers));
    });

};

exports.create = async (req, res) => {
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

exports.update = async (req, res) => {
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

exports.delete = async (req, res) => {
    User.findOne({ _id: req.body.id }, (err, user) => {
        if (err) { return res.sendStatus(500); }
        if (!user) {return res.sendStatus(404); }
        
        user.remove();
        return res.sendStatus(200);
    });
};