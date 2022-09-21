const router = require('express').Router();
const userMiddleware = require('../middlewares/User');
const userController = require('../controllers/User');

router.post('/user/add', userMiddleware.add, userController.add);

module.exports = router; 