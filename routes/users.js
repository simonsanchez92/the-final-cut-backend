const express = require('express');



const router = express.Router();

const {getFavourites} = require('../controllers/users');



router.route('/:user/favs').get(getFavourites);


module.exports = router;