const objectController = require('../../Controllers/objectController'),
    router = require('express').Router(),
    asyncHandler = require('express-async-handler'),
    authToken = require('../../Middlewares/authToken'),
    verifyUser = require('../../Middlewares/verifyUser'),
    { validateRequestBody } = require('../../Middlewares/validateRequest');

router.post(
    '/create', 
    asyncHandler(validateRequestBody), 
    authToken, 
    asyncHandler(verifyUser),
    asyncHandler(objectController.create),
);

router.put(
    '/update', 
    asyncHandler(validateRequestBody), 
    authToken, 
    asyncHandler(verifyUser),
    asyncHandler(objectController.update),
);
    
router.delete(
    '/delete',
    asyncHandler(validateRequestBody), 
    authToken, 
    asyncHandler(verifyUser),
    asyncHandler(objectController.delete),
);

module.exports = router;