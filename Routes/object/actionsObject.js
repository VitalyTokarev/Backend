const objectController = require('../../Controllers/objectController'),
    authToken = require('../../Middlewares/authToken');

module.exports = (router, path = '') => {
    router.post(`${path}/create`, authToken, objectController.create);

    router.put(`${path}/update`, authToken, objectController.update);
    
    router.delete(`${path}/delete`, authToken, objectController.delete);
};
