const userController = require('./../../Controllers/userController');
const router = require('express');

module.exports = (router, path = '') => {
    router.post(`${path}user/login`, userController.userLogin);
    router.post(`${path}user/signup`, userController.userSignup);
};

