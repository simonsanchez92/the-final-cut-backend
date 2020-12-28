import React from 'react';




 const MovieCard = (props) => {

    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    const  {poster_path,
            vote_average,
            original_title,
            release_date} = props.movie;


 
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
       

        {/* <button onClick="movieDetail(${movie.id})">See More...</button> */}

        </div>
        
        </div> 
        
        <div className='title-year-box'>
        <span><b>{original_title}</b></span>
        <span>{!release_date ? '' : release_date.split('-')[0]}</span>
        </div> 
        
  
        </div>
    )
}

export default MovieCard;
