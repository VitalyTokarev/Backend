const objectController = require('../../Controllers/objectController'),
    router = require('express').Router(),
    asyncHandler = require('express-async-handler'),
    authToken = require('../../Middlewares/authToken'),
    verifyUser = require('../../Middlewares/verifyUser');

router.get(
    '/object', 
    authToken, 
    asyncHandler(verifyUser),
    asyncHandler(objectController.list),
);

module.exports = router;