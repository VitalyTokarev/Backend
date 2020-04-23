const Object = require('../Models/Object'),
    User = require('../Models/User');

const userSearch = async userId => {
    const user = await User.findById(userId);
    
    if (!user) {
        return false;
    }

    return user;
};

exports.list = async (req, res) => {

    userSearch(req.token.data._id).then( user => {
        if (user) {
            Object.find({ user: user._id }).
            exec( (err, listObjects) => {
                if (err) { res.sendStatus(404); }
        
                res.send(JSON.stringify(listObjects));
            });
            return;
        }

        res.sendStatus(401);
    })
};

exports.create = (req, res) => {
    if (!req.body) { return res.sendStatus(400); }

    userSearch(req.token.data._id).then( user => {
        if (user) {
            const {
                _id,
                value,
                type,
                fruit,
            } = req.body;

            const object = new Object({
                _id,
                value,
                type,
                fruit,
                user: user._id
            });

            object.save( err => {
                if (err) { return res.sendStatus(500); }
                res.sendStatus(200);
            });
            return;
        }
        res.sendStatus(401);
    });
};

exports.update = (req, res) => {
    if(!req.body) { return res.sendStatus(400); }

    userSearch(req.token.data._id).then( user => {
        if(user) {
            const {
                _id,
                value,
                type,
                fruit,
            } = req.body;

            Object.findOneAndUpdate({ _id: _id, user: user._id }, {
                value,
                type,
                fruit,
            }, 
            (err) => {
                if (err) { return res.sendStatus(404); }
                res.sendStatus(200);
            }
            );
            return;
        }
        res.sendStatus(401);
    });
};

exports.delete = (req, res) => {
    if(!req.body) { return res.sendStatus(400); }

    userSearch(req.token.data._id).then( user => {
        if(user) {
            Object.findByIdAndDelete(req.body.id, err => {
                if (err) { return res.sendStatus(404); }
                res.sendStatus(200);
            });
            return;
        }
        res.sendStatus(401);
    });
};


