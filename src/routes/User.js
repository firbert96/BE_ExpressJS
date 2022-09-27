const router = require('express').Router();
const userMiddleware = require('../middlewares/User');
const jwtMiddleware = require('../middlewares/JWT');
const userController = require('../controllers/User');

router.post('/user/add', userMiddleware.add, userController.add);
router.get('/user/getAll', userController.getAll);
router.post('/user/login', userController.login);
router.get('/user/getById', jwtMiddleware.verifyToken, userMiddleware.getById, userController.getById);
router.put('/user/update', jwtMiddleware.verifyToken, userMiddleware.update, userController.update);
router.delete('/user/delete/soft', jwtMiddleware.verifyToken, userMiddleware.getById, userController.deleteSoft);
router.delete('/user/delete/hard', jwtMiddleware.verifyToken, userMiddleware.getById, userController.deleteHard);
module.exports = router; 