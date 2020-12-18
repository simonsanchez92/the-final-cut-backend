const express = require('express');

const router = express.Router();

const User = require('../models/User');

const {register} = require('../controllers/auth')

const {validateUser} = require('../middleware/userValidator');


router.route('/register').post(validateUser, register)



module.exports = router;