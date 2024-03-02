const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const authMiddleware = require('../middlewares/authMidl')
const authorization = require('../middlewares/authorization');

router.get('/',authMiddleware.authenticateToken, postController.getAllPosts);
router.get('/:id',authMiddleware.authenticateToken, postController.getPost);
router.post('/',  authMiddleware.authenticateToken,authorization.checkUserRole('user'), postController.createPost);
router.put('/:id',authMiddleware.authenticateToken, authorization.checkUserRole('user'), postController.updatePost);
router.delete('/:id',authMiddleware.authenticateToken,authorization.checkUserRole('user'), postController.deletePost);

module.exports = router;
