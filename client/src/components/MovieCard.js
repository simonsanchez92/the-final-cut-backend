    import React, {Fragment} from 'react';
    import {Link} from 'react-router-dom';
    
    import toastr from 'toastr';
    import './toastr.min.css'

import {connect} from 'react-redux';

import {addFavourite} from '../actions/movies';

 const MovieCard = ({movie, addFavourite, user}) => {

    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    const  {poster_path,
            vote_average,
            original_title,
            release_date,
            overview,
            original_language,
            id} = movie;

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
                original_id: id
            }
        addFavourite(newMovie);
        toastr.options = {
            hideDuration: 800,
            
            timeOut: 3000,
            positionClass: 'toast-bottom-center'
          }
          toastr.success(`You've added a new movie`, '')
    
        
        }
       
      
    }    
 
    return (
        <div className="movie-card">
         <i className="fas fa-tv"></i>
       
        <div className="movie-img-container">

        <img src={poster_path !== null ? IMG_PATH + poster_path : 'img/default.jpg'} alt={original_title}/>
        
        <div className="card-overlay">
        
        <div className='movie-rating'>
            <i className="fas fa-star"></i>
            <span>{vote_average}/10</span>
        </div>

        <ul>
            {/* {
                movieGenres.map(gnr=> <li key={gnr.id}>{gnr.name}</li>)
            } */}
            
        </ul>
       
        <div className="card-btns">
            <Link className='btn btn-success see-more my-5' to={{
            pathname:`movies/${id}`,
            movieProps:{movie: movie}
            }}>See more...</Link>
            
            <div className="card-add-remove">
            <button onClick={add} className='btn btn-success'>Add</button>
            <button className='btn btn-danger'>X</button>
            </div>
            
        </div>
            
         
            
        </div>
        
        </div> 
        
        <div className='title-year-box'>
        <span><b>{original_title}</b></span>
        <span>{!release_date ? '' : release_date.split('-')[0]}</span>
        </div> 
        
  
        </div>
    )
}

const mapStateToProps = (state, ownProps)=>({
    movie: ownProps.movie,
    user: state.auth.user
})


export default connect(mapStateToProps, {addFavourite})(MovieCard);
