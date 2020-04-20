const express = require('express'),
    router = express.Router();
    objectController = require('../../Controllers/objectController');

router.post('/create', objectController.objectCreate);

router.put('/update', objectController.objectUpdate);

router.delete('/delete', objectController.objectDelete);

module.exports = router;