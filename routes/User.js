const router = require('express').Router();
const userMiddleware = require('../middlewares/User');
const userController = require('../controllers/User');

router.post('/user/add', userMiddleware.add, userController.add);
router.get('/user/getAll', userController.getAll);
router.get('/user/getById', userMiddleware.getById, userController.getById);
router.put('/user/update', userMiddleware.update, userController.update);
router.delete('/user/delete/soft', userMiddleware.getById, userController.deleteSoft);
router.delete('/user/delete/hard', userMiddleware.getById, userController.deleteHard);
module.exports = router; 