const express = require('express');
const UserModel = require('../Model/postModel.js');
require('dotenv').config();
const router = express.Router();
const post = require('../controllers/post.js');


router.post('/',post.newPost);
router.get('/',post.allPost);
    

module.exports = router;