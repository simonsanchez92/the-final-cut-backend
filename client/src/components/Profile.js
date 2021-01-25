import React, { Fragment, useEffect, useState } from 'react'

import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


// import setAlert from '../utils/setAlert';
// import {store} from '../store';

import { deleteMovie, loadFavourites, getSingleMovie } from '../actions/movies'



const Profile = ({ isAuthenticated, favs, deleteMovie,loadFavourites, user, getSingleMovie}) => {

  const [auth, setAuth] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      setAuth(isAuthenticated)
    }
  }, [])


  // if(!auth){
  //     return <Redirect to='/'/>
  // }


  const handleDelete = (userId, movieId) => {
    deleteMovie(userId, movieId);
    loadFavourites(userId);
  }

  return (
    <main className='profile container-fluid my-4 px-4'>
      <h2 className='text-justify-left'>My favourite films</h2>
      {favs.length < 1 && isAuthenticated && <Fragment><h2>You haven't added any movies yet</h2></Fragment>}



      <section className="
      profile-movies
      container-fluid
      py-4">


        {isAuthenticated === null ? <Fragment><h1>Loading....</h1></Fragment> : favs && favs.map((movie, i) => {
          return <Fragment key={movie._id} >
            <div className="card mb-4 profile-movie">
              <div className="row no-gutters justify-content-between">
                <div className="col-sm-5  col-lg-2">
                  <img className='card-img-top' src={movie.poster_path} alt={movie.title} />
                </div>

                <div className="card-body col-sm-2 col-md-4" >
                    <h4 className="card-title ">{movie.title}</h4>
                    <ul className="list-group list-group-flush ">
                      <li className="list-group-item  px-0">Average: {movie.average}</li>
                      <li className="list-group-item  px-0">Year: {movie.release}</li>
                      <li className="list-group-item  px-0">Language: {movie.language}</li>
                    </ul>
                    
                    <span  onClick={()=>getSingleMovie(movie.original_id)}
                          className="btn btn-success">
                    <Link  to={{pathname:`movies/${movie.original_id}`
            }}>See plot</Link></span>
                    <a href="#" onClick={() => handleDelete(user._id, movie._id)} className="btn btn-danger mx-2">Remove</a>
                  
                  </div>

                <div className="col-sm-2 col-md-4 movie-info">
                  <div className="backdrop-img-container">
                    <img src={movie.backdrop_path} alt={movie.title}/>
                  </div>
                  
                </div>
              </div>
            </div>
          </Fragment>
        })}


      </section>
    </main>
  )


}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  favs: state.movies.favourites,
  user: state.auth.user
})

export default connect(mapStateToProps, { deleteMovie, loadFavourites, getSingleMovie})(Profile)
