const adminController = require('./../../Controllers/adminController'),
    asyncHandler = require('express-async-handler'),
    router = require('express').Router(),
    { authToken } = require('../../Services/actionsTokens');

router.get(
    '/show', 
    authToken,
    asyncHandler(adminController.checkRole('admin')),
    asyncHandler(adminController.getUsers), 
);

router.post(
    '/create', 
    asyncHandler(adminController.validateRequest), 
    authToken,
    asyncHandler(adminController.checkRole('admin')), 
    asyncHandler(adminController.createUser), 
);

router.put(
    '/update', 
    asyncHandler(adminController.validateRequest), 
    authToken,
    asyncHandler(adminController.checkRole('admin')), 
    asyncHandler(adminController.updateUser), 
);

router.delete(
    '/delete', 
    asyncHandler(adminController.validateRequest), 
    authToken,
    asyncHandler(adminController.checkRole('admin')), 
    asyncHandler(adminController.deleteUser), 
);

module.exports = router;