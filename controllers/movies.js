

const axios = require('axios');

const Movie = require('../models/Movie');

// @Description - Get movies
// @Route - GET  /api/v1/
// @access - Public

exports.getMovies = async (req,res,next)=>{
const proxy = 'https://cors-anywhere.herokuapp.com/';
   
const page = req.params.page;
const API_URL =`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4c0c205a5315c151196343cd53dbf96f&page=${page}`;

    try {
        const response = await axios.get(API_URL);
    
        
    res.status(200).json({
        success: true,
        data: response.data
    });

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Server error"
        })
    }
}

// @Description - Add movie to Favourites
// @Route - POST  /api/v1/movies
// @access - Private

exports.addFavourite = async (req, res, next)=>{

    const { user,
            title,
            average,
            release,
            language,
           overview,
           poster_path,
            original_id} = req.body

    try {
        let movie = await Movie.findOne({user, original_id})

        if(movie){
            return res.status(400).json({msg: 'You already added this movie'});
        }

        movie = new Movie({
            user,
            title,
            average,
            release,
            language,
            overview,
            poster_path,
            original_id
        });

        await movie.save();

        res.status(200).json({
            success: true,
            data: movie
        });

    } catch (err) {
        console.log(err)
        if(err.kind == "ObjectId"){
        res.status(400).json({msg: 'You must include a valid user id'});
        }else{

            res.status(500).json({msg: 'Server error'});
        }
    }

}

