

const axios = require('axios');

const Movie = require('../models/Movie');

// @Description - Get most popular movies
// @Route - GET  /api/v1/
// @access - Public

exports.getMovies = async (req,res,next)=>{
 
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

// @Description - Search movies by title
// @Route - GET  /api/v1/
// @access - Public

exports.searchMovies = async (req,res,next)=>{
 
const title = req.params.title;
const page = req.params.page;


const API_URL =`https://api.themoviedb.org/3/search/movie?api_key=4c0c205a5315c151196343cd53dbf96f&query=${title}/&page=${page}`;

    try {
        const response = await axios.get(API_URL);
    
        if(!response.data.total_results){
            return res.status(404).json({
                success:false,
                msg: `No movies found for '${title}'`})
        }
        
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
           backdrop_path,
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
            backdrop_path,
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


// @Description - Remove from favs
// @Route - Delete  /api/v1/movies/:userId/:movieId
// @access - Private

exports.deleteMovie  = async(req,res, next)=>{

    const movieId = req.params.movieId;
    const userId = req.params.userId;
 
    try {   

    await Movie.findByIdAndDelete({_id: movieId, user:userId});

    
    res.status(200).json({
        msg: 'Success',
        data: []
    })
  } catch (err) {
    console.log(err)
  }
   
}

