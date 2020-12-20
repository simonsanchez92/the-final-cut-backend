const express = require('express');

const router = express.Router();

const User = require('../models/User');

const {register, getUsers, getUser} = require('../controllers/auth')

//Validation Middleware
const {validateUser} = require('../middleware/userValidator');


router.route('/register').post(validateUser, register)
router.route('/users').get(getUsers);
router.route('/users/:id').get(getUser);



module.exports = router;