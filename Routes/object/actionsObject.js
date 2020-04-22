const objectController = require('../../Controllers/objectController');

module.exports = (router, path = '') => {
    router.post(`${path}/create`, objectController.objectCreate);

    router.put(`${path}/update`, objectController.objectUpdate);
    
    router.delete(`${path}/delete`, objectController.objectDelete);
};
