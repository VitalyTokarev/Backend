const authController = require('../../Controllers/authController'),
    asyncHandler = require('express-async-handler'),
    router = require('express').Router(),
    { 
        validateRequestBody,
        validateRequestAuthorizationHeaders,
    } = require('../../Middlewares/validateRequest'); 

router.post(
    '/login', 
    asyncHandler(validateRequestAuthorizationHeaders),
    asyncHandler(authController.verifyLoginRequest), 
    asyncHandler(authController.setTokens), 
    asyncHandler(authController.sendRepsonse)
);

router.post(
    '/signup', 
    asyncHandler(validateRequestBody), 
    asyncHandler(authController.verifySignupRequest), 
    asyncHandler(authController.createNewUser), 
    asyncHandler(authController.setTokens), 
    asyncHandler(authController.sendRepsonse)
);

router.post(
    '/update_token', 
    asyncHandler(validateRequestAuthorizationHeaders),
    asyncHandler(authController.verifyRefrshTokensRequest),
    asyncHandler(authController.setTokens), 
    asyncHandler(authController.sendRepsonse)
);

module.exports = router;