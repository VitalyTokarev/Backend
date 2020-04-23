const objectController = require('../../Controllers/objectController'),
    authToken = require('../../Middlewares/authToken');

module.exports = (router, path = '') => {
    router.get(`${path}/object`, authToken, objectController.list);
};