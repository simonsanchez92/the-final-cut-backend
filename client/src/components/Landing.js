import React, {Fragment} from 'react'

 const Landing = (props) => {

  console.log(props.movies)

  const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
  
    return (
        <Fragment>
            <div className="search-container container-fluid
        d-flex
        justify-content-center" id='search-container'>



    <form className='search-form py-4 px-1' id='search-form'>
        
        <div className="input-group ">

<input className="search-input
          form-control" 
    type="text" 
    placeholder='Begin your search...'  
    id='search-input'/>

<input className='search-form search-Btn
           btn'
     value='Search' type='button'  id='searchBtn'
  placeholder=""/>
        </div>
       
    </form>


</div>



<main className="main" id='main'>
    <h2 id="search-text">Latest Movies:</h2>

    <div className="movies-container" id='movies-container'>

        {props.movies === undefined ? '' : (
            props.movies.map(movie=> {
                return <div class="movie-card">
                <i class="fas fa-tv"></i>
               
                <div class="movie-img-container">
        
                <img src={movie.poster_path !== null ? IMG_PATH + movie.poster_path : 'img/default.jpg'} alt={movie.original_title}/>
                
                <div class="card-overlay">
                
                <div class='movie-rating'>
                    <i class="fas fa-star"></i>
                    <span>{movie.vote_average}/10</span>
                </div>
        
               
        
                <button onclick="movieDetail(${movie.id})">See More...</button>
        
                </div>
                
                </div> 
                
                <div class='title-year-box'>
                <span><b>{movie.original_title}</b></span>
                <span>{!movie.release_date ? '' : movie.release_date.split('-')[0]}</span>
                </div>
          
                </div>
            })
        )}
       

    </div>
</main>

<div className="pagination" id="pagination">
    
   
</div>
        </Fragment>
    )
}


export default Landing;
