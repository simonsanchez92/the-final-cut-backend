const express = require('express');



const router = express.Router();

const {getMovies} = require('../controllers/movies');

router.route('/:page').get(getMovies);



module.exports = router;