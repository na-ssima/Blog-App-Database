const express = require('express')
const router = express.Router()
const { body } = require("express-validator");
const postController = require('../controllers/postController')


router.post('/',  [
    body("email")
      .notEmpty()
      .isLength({ min: 10 })
      .isAlphanumeric()
      .trim()
      .escape(),
    body("password").notEmpty().isLength({ min: 10 }).trim().escape(),
  ],
 postController.login);
module.exports = router;
