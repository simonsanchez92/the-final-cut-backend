
const Movie = require('../models/Movie');



// @Description - Get user's favourite movies
// @Route - GET  /api/v1/movies/:user
// @access - Private

exports.getFavourites = async (req, res, next)=>{

    const user = req.params.user;

    try {
        const movies = await Movie.find({user})


        res.status(200).json({
            success: true,
            data: movies
        })
        
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}