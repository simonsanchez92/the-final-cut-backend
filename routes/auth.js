const express = require('express');

const router = express.Router();

const User = require('../models/User');

const {register, login, getUsers, getUser, deleteUser} = require('../controllers/auth')

//Validation Middleware
const {validateUser} = require('../middleware/userValidator');
const auth = require('../middleware/auth')


router.route('/').get(auth, getUser)
router.route('/register').post(validateUser, register)
router.route('/users').get(getUsers);
router.route('/login').post(validateUser, login);
router.route('/users/:id').delete(deleteUser);


module.exports = router;