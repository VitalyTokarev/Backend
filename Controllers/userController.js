const argon2 = require('argon2'),
    { randomBytes } = require('crypto'), 
    User = require('./../Models/User'),
    jwtGenerate = require('./../Services');

exports.login = async (req, res) => {
    if (!req.body) { return res.sendStatus(400) }; 

    const email = req.body.email;
    const userRecord = await User.findOne({ email });

    if (!userRecord) {
        return res.sendStatus(404);
    }

    const password = req.body.password;
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
exports.signup = async (req, res) => {
    if (!req.body) { return res.sendStatus(400) }; 

    const email = req.body.email,
        password = req.body.password,
        name = req.body.name,
        salt = randomBytes(32),
        passwordHashed = await argon2.hash(password, {salt});

    const user = new User({
        password:passwordHashed,
        email,
        name,
        salt: salt.toString('hex'),
    });

    user.save( err => {
        if (err) { return res.sendStatus(404); }

        return res.send(JSON.stringify(
            {
                user:{
                    email: user.email,
                    name: user.name,
                },
                token: jwtGenerate(user),
            }
        ));
    });
};


