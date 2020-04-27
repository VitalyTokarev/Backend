const objectController = require('../../Controllers/objectController'),
    router = require('express').Router(),
    asyncHandler = require('express-async-handler'),
    { authToken } = require('../../Services/actionsTokens');

router.get(
    '/object', 
    authToken, 
    asyncHandler(objectController.verifyUser),
    asyncHandler(objectController.list),
);

module.exports = router;