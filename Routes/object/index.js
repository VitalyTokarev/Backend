const objectController = require('../../Controllers/objectController');

module.exports = (router, path = '') => {
    router.get(`${path}/object`, objectController.objectList);
};