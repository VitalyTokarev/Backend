const express = require('express'),
    router = express.Router(),
    objectController = require('../../Controllers/objectController');

router.get('/object', objectController.objectList);

module.exports = router;