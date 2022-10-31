const router = require('express').Router();
const userMiddleware = require('../middlewares/User');
const jwtMiddleware = require('../middlewares/JWT');
const userController = require('../controllers/User');

router.post('/user/add', userMiddleware.add, userController.add);
router.get('/user/get/all', userController.getAll);
router.post('/user/login', userController.login);
router.get('/user/get/id', jwtMiddleware.verifyToken, userMiddleware.getById, userController.getById);
router.put('/user/update', jwtMiddleware.verifyToken, userMiddleware.update, userController.update);
router.delete('/user/delete', jwtMiddleware.verifyToken, userMiddleware.getById, userController.delete);
router.post('/user/logout', jwtMiddleware.verifyToken, userController.logout);
router.get('/user/me', jwtMiddleware.verifyToken, userController.me);
module.exports = router; 