const Object = require('../Models/Object.js');

exports.objectList = (req, res) => {
    Object.find({}).
    exec( (err, listObjects) => {
        if (err) { res.sendStatus(404); }

        res.send(JSON.stringify(listObjects));
    });
};

exports.objectCreate = (req, res, next) => {
    if(!req.body) { return res.sendStatus(400); }

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
    });

    object.save( err => {
        if (err) { return res.sendStatus(404); }
        res.sendStatus(200);
    });
};

exports.objectUpdate = (req, res) => {
    if(!req.body) { return res.sendStatus(400); }

    const {
        _id,
        value,
        type,
        fruit,
    } = req.body;

    Object.findByIdAndUpdate(_id, {
        value,
        type,
        fruit,
    }, 
    (err) => {
        if (err) { return res.sendStatus(404); }
        res.sendStatus(200);
    }
    );
};

exports.objectDelete = (req, res) => {
    if(!req.body) { return res.sendStatus(400); }
    Object.findByIdAndDelete(req.body.id, err => {
        if (err) { return res.sendStatus(404); }
        res.sendStatus(200);
    });
};
