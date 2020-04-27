const objectController = require('../../Controllers/objectController'),
    router = require('express').Router(),
    asyncHandler = require('express-async-handler'),
    { authToken } = require('../../Services/actionsTokens');

router.post(
    '/create', 
    asyncHandler(objectController.validateRequest),
    authToken, 
    asyncHandler(objectController.verifyUser),
    asyncHandler(objectController.create),
);

router.put(
    '/update', 
    asyncHandler(objectController.validateRequest),
    authToken, 
    asyncHandler(objectController.verifyUser),
    asyncHandler(objectController.update),
);
    
router.delete(
    '/delete',
    asyncHandler(objectController.validateRequest),
    authToken, 
    asyncHandler(objectController.verifyUser),
    asyncHandler(objectController.delete),
);

module.exports = router;