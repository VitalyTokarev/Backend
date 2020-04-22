const user = require('./user'),
    object = require('./object'),
    actionsObject = require('./object/actionsObject'),
    express = require('express'),
    router = express.Router();

user(router);
object(router);
actionsObject(router, '/object');

module.exports = router;




