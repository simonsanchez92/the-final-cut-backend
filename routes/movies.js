const express = require('express');



const router = express.Router();

const { getMovies,
        addFavourite,
        deleteMovie,
        searchMovies
        } = require('../controllers/movies');

router.route('/:page').get(getMovies);

router.route('/search/:title/:page').get(searchMovies);

router.route('/').post(addFavourite);

router.route('/:userId/:movieId').delete(deleteMovie);





module.exports = router;