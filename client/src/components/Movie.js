import React, {Fragment} from 'react'
// import {  Link } from 'react-router-dom';

import {connect} from 'react-redux';

import {addFavourite, deleteMovie, loadFavourites} from '../actions/movies';

import {store} from '../store';
import setAlert from '../utils/setAlert';

import SearchBar from './SearchBar';

 const Movie = ({ currentMovie, favourites, user, addFavourite, deleteMovie, loadFavourites}) => {
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';


    
    const {original_title,
           overview,
           id,
           vote_average,
           release_date,
           poster_path,
           backdrop_path,
           homepage,
           original_language,
           production_countries,
           production_companies,
           runtime,
           revenue,
           tagline} =  currentMovie
 
//  const companies = production_companies.filter((company) =>{
//    return company.logo_path !== null
//  }).map((comp,i)=> <li  className="company-logo-container mx-3 my-3">
//     <img  key={comp.id} src={IMG_PATH + comp.logo_path} alt={comp.name}/>
//     </li>);

  //Determine whether movie is in user's favourites
    const likeBtn = (movieId)=>{
        return favourites.some(movie=> movie.original_id === movieId )
    };

    const add = ()=>{
        
        if(user){
            const newMovie = {
                user:user._id,
                title: original_title,
                average: vote_average,
                release: release_date,
                language: original_language,
                overview: overview,
                poster_path: IMG_PATH + poster_path,
                backdrop_path: IMG_PATH + backdrop_path,
                original_id: id
            }
        addFavourite(newMovie);
        }else{
            setAlert('error', 'You must have an account')
        } 
    } 

    const handleDelete = (userId, movieId) => {
        favourites.forEach(movie=>{

            if(movie.original_id === movieId){
                // store.dispatch(deleteMovie(userId, movie._id));
                // store.dispatch(loadFavourites(userId));

                deleteMovie(userId, movie._id);
                loadFavourites(userId);
            }
        })
    }
 
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

            <div className="poster-container col-sm-12 col-md-4 py-2 mx-2">
                <img src={IMG_PATH + poster_path} alt={original_title}/>
                {/* <button className='btn btn-primary my-3'>Like <i class="far fa-thumbs-up"></i></button> */}
               
                {likeBtn(id) ? 
                <Fragment>
                    <button onClick={()=>handleDelete(user._id, id)} className='btn btn-danger my-3'>Dislike <i class="far fa-thumbs-up"></i></button>
                
                </Fragment>
                :
                <Fragment>
                 <button onClick={()=>add()} className='btn btn-primary my-3'>Like <i class="far fa-thumbs-up"></i></button>
                </Fragment>}
            </div>

      

        <div className='movie-data-list
                    col-sm-12
                    col-md-8                
                    d-flex flex-column 
                    justify-content-top
                    py-4
                    align-items-top'>

            <p className='my-1 '>{overview}</p>
           
            <ul className='list-group list-group-horizontal-md py-4 d-flex flex-wrap   align-items-center'>
            <li className='py-2 my-2'><i className="fas fa-star "></i> imdbRating: {vote_average}/10</li>
            <li className='py-2 my-2 '><i className="fas fa-star "></i> Country: {production_countries.map(country=> <Fragment>{country.name} / </Fragment>)}</li>
            
            <li className='py-2 my-2'><i className="fas fa-star "></i> Released: {release_date}</li>
            <li className='py-2 my-2'><i className="fas fa-star "></i> Runtime: {runtime} min.</li>
            <li className='py-2 my-2'><i className="fas fa-star "></i> Revenue: ${revenue}</li>
            
            </ul>

            {/* <ul className='companies list-group py-4 '>{companies}</ul> */}

            
            
        </div>

        </div>
{/*         
        <div className="movie-detail-btns container-fluid">
            <Link to='/'><button className='return-btn btn btn-sm' id='return-btn'><i className="fas fa-undo-alt return-btn-icon"></i></button></Link>

        </div> */}
    
</main> 
</Fragment>
    )
}

const mapStateToProps = (state)=>({
    currentMovie: state.movies.currentMovie,
    user: state.auth.user,
    favourites: state.movies.favourites
})

export default connect(mapStateToProps, {addFavourite, deleteMovie, loadFavourites})(Movie);
