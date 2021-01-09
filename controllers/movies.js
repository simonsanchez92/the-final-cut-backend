

const axios = require('axios');


// @Description - Get movies
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