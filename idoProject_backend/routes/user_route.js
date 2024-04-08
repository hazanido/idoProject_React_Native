const express = require('express');
const UserModel = require('../Model/userModel.js');
require('dotenv').config();
const router = express.Router();
const user = require('../controllers/user.js');


router.post('/',user.newUser);

    

module.exports = router;