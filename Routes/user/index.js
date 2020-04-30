const userController = require('./../../Controllers/userController'),
    asyncHandler = require('express-async-handler'),
    router = require('express').Router();

router.post(
    '/login', 
    asyncHandler(userController.validateLoginRequest),
    asyncHandler(userController.verifyLoginRequest), 
    asyncHandler(userController.setTokens), 
    asyncHandler(userController.sendRepsonse)
);

router.post(
    '/signup', 
    asyncHandler(userController.validateSignupRequest), 
    asyncHandler(userController.verifySignupRequest), 
    asyncHandler(userController.createNewUser), 
    asyncHandler(userController.setTokens), 
    asyncHandler(userController.sendRepsonse)
);

router.post(
    '/update_token', 
    asyncHandler(userController.validateRefreshTokensRequest),
    asyncHandler(userController.verifyRefrshTokensRequest),
    asyncHandler(userController.setTokens), 
    asyncHandler(userController.sendRepsonse)
);

module.exports = router;