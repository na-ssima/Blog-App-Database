const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

router.post('/', postController.registerUser);
module.exports = router;
