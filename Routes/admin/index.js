const userController = require('../../Controllers/userController'),
    asyncHandler = require('express-async-handler'),
    router = require('express').Router(),
    authToken = require('../../Middlewares/authToken'),
    checkRole = require('../../Middlewares/checkRole'),
    verifyUser = require('../../Middlewares/verifyUser'),
    { validateRequestBody } = require('../../Middlewares/validateRequest');

router.get(
    '/show', 
    authToken,
    asyncHandler(verifyUser),
    asyncHandler(checkRole('admin')),
    asyncHandler(userController.getAll), 
);

router.post(
    '/create', 
    asyncHandler(validateRequestBody), 
    authToken,
    asyncHandler(verifyUser),
    asyncHandler(checkRole('admin')), 
    asyncHandler(userController.create), 
);

router.put(
    '/update', 
    asyncHandler(validateRequestBody), 
    authToken,
    asyncHandler(verifyUser),
    asyncHandler(checkRole('admin')), 
    asyncHandler(userController.update), 
);

router.delete(
    '/delete', 
    asyncHandler(validateRequestBody), 
    authToken,
    asyncHandler(verifyUser),
    asyncHandler(checkRole('admin')), 
    asyncHandler(userController.delete), 
);

module.exports = router;