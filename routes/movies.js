const express = require('express');



const router = express.Router();

const { getMovies,
        addFavourite,
        } = require('../controllers/movies');

router.route('/:page').get(getMovies);

router.route('/').post(addFavourite);





module.exports = router;