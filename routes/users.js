const express = require('express');



const User = require('../models/User');


const router = express.Router();


router.route('/').post(createUser);



module.exports = router;