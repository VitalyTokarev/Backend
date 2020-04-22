const argon2 = require('argon2'),
    { randomBytes } = require('crypto'), 
    User = require('./../Models/User'),
    jwtGenerate = require('./../Services');

exports.userLogin = async (req, res) => {
    if (!req.body) { return res.sendStatus(400) }; 

    const email = req.body.user.email;
    const userRecord = await User.findOne({ email });

    if (!userRecord) {
        return res.sendStatus(404);
    }

    const password = req.body.user.password;
    const correctPassword = await argon2.verify(userRecord.password, password);

    if (!correctPassword) {
        return res.sendStatus(401);
    }

    return res.send(JSON.stringify(
        {
            user:{
                email: userRecord.email,
                name: userRecord.name,
            },
            token: jwtGenerate(userRecord),
        }
    ));
};
exports.userSignup = async (req, res) => {
    if (!req.body) { return res.sendStatus(400) }; 

    const email = req.body.email,
        password = req.body.password,
        salt = randomBytes(32),
        passwordHashed = await argon2.hash(password, {salt});

    const User = new User({
        password:passwordHashed,
        email,
        salt: salt.toString('hex'),
    });

    User.save( err => {
        if (err) { return res.sendStatus(404); }

        return res.send(JSON.stringify(
            {
                user:{
                    email: userRecord.email,
                    name: userRecord.name,
                },
                token: jwtGenerate(userRecord),
            }
        ));
    });
};


