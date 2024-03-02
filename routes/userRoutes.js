const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMidl');
const authorizationMiddleware = require('../middlewares/authorization');
const userController = require('../controllers/UserController');

router.put('/:id', authMiddleware.authenticateToken, authorizationMiddleware.checkUserRole('admin'), userController.updateUser);
router.get('/:id', authMiddleware.authenticateToken, authorizationMiddleware.checkUserRole('admin'), userController.getUser);
router.delete('/:id', authMiddleware.authenticateToken, authorizationMiddleware.checkUserRole('admin'), userController.deleteUser);

module.exports = router;
