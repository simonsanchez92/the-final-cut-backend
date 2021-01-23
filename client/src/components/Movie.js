import React, {Fragment} from 'react'
import {  Link } from 'react-router-dom';

import {connect} from 'react-redux';



import SearchBar from './SearchBar';

 const Movie = ({ currentMovie}) => {
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';


    
    const {original_title,
           overview,
           vote_average,
           release_date,
           poster_path,
           backdrop_path,
           homepage,
           production_countries,
           production_companies,
           runtime,
           revenue,
           tagline} =  currentMovie
 

    return (
        <Fragment>
            <SearchBar/>
           
       <main className="movie-detail
                container-fluid
                px-4
                d-flex
                flex-column
                justify-content-center" id="movie-detail">
        
        <h2 className="movie-title my-4">{original_title}</h2>

        <div className="movie-data
                    row
                    justify-content-center
                    my-2 ">

            <div className="poster-container col-sm-12 col-md-4 py-5">
                <img src={IMG_PATH + poster_path} alt={original_title}/>
            </div>

      

        <div className='movie-data-list
                    col-sm-12
                    col-md-8                
                    d-flex flex-column 
                    justify-content-top
                    py-5
                    align-items-top'>

            <p className='my-1 '>{overview}</p>
           
            <ul className='list-group list-group-horizontal-md py-4 d-flex flex-wrap   align-items-center'>
            <li className='py-2 my-2'><i className="fas fa-star "></i> imdbRating: {vote_average}/10</li>
            <li className='py-2 my-2 '><i className="fas fa-star "></i> Country: {production_countries.map(country=> <Fragment>{country.name} / </Fragment>)}</li>
            
            <li className='py-2 my-2'><i className="fas fa-star "></i> Released: {release_date}</li>
            <li className='py-2 my-2'><i className="fas fa-star "></i> Runtime: {runtime} min.</li>
            <li className='py-2 my-2'><i className="fas fa-star "></i> Revenue: ${revenue}</li>
            
            </ul>

            <ul className='  companies list-group
                             list-group-horizontal-md 
                             py-4 d-flex flex-wrap 
                             justify-content-start'>
                {production_companies.map(company=>
                <Fragment><li className="company-logo-container mx-3">
                              <img src={IMG_PATH + company.logo_path} alt={company.name}/>
                              </li></Fragment>)}
                </ul>

            
            
        </div>

        </div>

    <Link to='/'><button className='return-btn btn btn-sm' id='return-btn'><i className="fas fa-undo-alt return-btn-icon"></i> Return</button></Link>
    
</main> 
</Fragment>
    )
}

const mapStateToProps = (state)=>({
    currentMovie: state.movies.currentMovie
})

export default connect(mapStateToProps)(Movie);
