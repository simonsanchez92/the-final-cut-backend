import React, {Fragment} from 'react'
import {  Link } from 'react-router-dom';

import Header from './Header';
import SearchBar from './SearchBar';

 const Movie = (props) => {
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';


    
    const {original_title,
           overview,
           vote_average,
           release_date,
           poster_path} =  props.location.movieProps.movie
    

    return (
        <Fragment>
            <SearchBar/>
        <main className="movie-detail
                container-fluid
                py-4
                d-flex
                flex-column
                justify-content-center" id="movie-detail">
        
        <h3 className="movie-title  ">{original_title}</h3>

        <div className="movie-data
                    row
                    justify-content-center
                    my-4 ">

            <div className="poster-container col-sm py-5">
                <img src={IMG_PATH + poster_path} alt={original_title}/>
            </div>

      

        <div className='movie-data-list
                    col-md-9
                    
                    d-flex flex-column 
                    justify-content-center'>

            <p className='my-1 col-sm-12 '>{overview}</p>
           
            <ul className='list-group list-group-horizontal-md py-4 d-flex flex-wrap   align-items-center'>
            <li className='py-2 my-2 mx-2'><i className="fas fa-star mx-2"></i>imdbRating: {vote_average}/10</li>
            <li className='py-2 my-2 mx-2'><i className="fas fa-star mx-2"></i>Year: {release_date}</li>
           
            </ul>
            
        </div>

        </div>

    <Link to='/'><button className='return-btn btn btn-sm' id='return-btn'><i className="fas fa-undo-alt return-btn-icon"></i> Return</button></Link>
    
</main>
</Fragment>
    )
}

export default Movie;
