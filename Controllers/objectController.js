const Object = require('../Models/Object');

exports.list = async (req, res) => {
    Object.find({ user: req.currUser ._id }, 'value type fruit').
    exec( (err, listObjects) => {
        if (err) { return res.sendStatus(500); }
    
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
        if (err) { return res.sendStatus(500); }

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
            if (err) { return res.sendStatus(500); }
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
        if (err) { return res.sendStatus(500); }
        if(!user) { return res.sendStatus(404); }
        res.sendStatus(200);
    });
};


