import React, {Fragment, useState,useEffect} from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

 const Landing = (props) => {

  
  const [genres, setGenres] = useState()


  useEffect(()=>{
    async function fetchData(){
      const API_URL =`https://api.themoviedb.org/3/genre/movie/list?api_key=4c0c205a5315c151196343cd53dbf96f&language=en-US`;

      const res = await axios.get(API_URL);
      const data = await res.data.genres;
      setGenres(data);
    }
    fetchData();
  },[])

 const forward = ()=>{
     let page = props.page + 1;
     props.paginate(page)
 }
 const backward = ()=>{
     if(props.page > 1){
        let page = props.page - 1;
        props.paginate(page)
     }
    
 }
  
    return (
        <Fragment>
            <SearchBar/>
        <main className="main" id='main'>
            <h2 id="search-text">Latest Movies:</h2>

            <div className="movies-container" id='movies-container'>

        {props.movies === undefined ? '' : (
            props.movies.map(movie=>  <MovieCard key={movie.id} movie={movie} genres={genres}/>)
        )}
       

        </div>
      </main>

        <div className="pagination" id="pagination">
            {props.page === 1 ? 
            <button onClick={()=> backward()} className='btn' disabled><i className="far fa-hand-point-left"></i>Prev</button>
                : 
            <button onClick={()=> backward()} className='btn'><i className="far fa-hand-point-left"></i>Prev</button>
            } 
            <button onClick={()=> forward()} className='btn'>Next<i className="far fa-hand-point-right"></i></button>
        </div>
        </Fragment>
    )
}


export default Landing;
