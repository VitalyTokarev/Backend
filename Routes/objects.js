const express = require('express'),
    router = express.Router(),
    objectController = require('../Controllers/objectController');

router.get('/object/objects_list', objectController.objectList);

router.post('/object/create', objectController.objectCreate);

router.put('/object/update', objectController.objectUpdate);

router.delete('/object/delete', objectController.objectDelete);

module.exports = router;