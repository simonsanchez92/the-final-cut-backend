import React, { Fragment, useEffect, useState } from 'react'

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import setAlert from '../utils/setAlert';

import { deleteMovie, loadFavourites } from '../actions/movies'

import store from '../store';


const Profile = ({ isAuthenticated, favs, deleteMovie, user }) => {

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
    store.dispatch(loadFavourites(userId));
  }




  return (
    <main className='container-fluid my-4 px-4'>
      <h2 className='text-justify-left'>My favourite films</h2>
      {favs.length < 1 && isAuthenticated && <Fragment><h2>You haven't added any movies yet</h2></Fragment>}



      <section className="
      profile-movies
      container-fluid
      py-4">


        {isAuthenticated === null ? <Fragment><h1>Loading....</h1></Fragment> : favs && favs.map((movie, i) => {
          return <Fragment key={movie._id} >
            <div className="card mb-4 profile-movie"   >
              <div className="row no-gutters justify-content-left">
                <div className="col-sm-4 col-lg-2">
                  <img className='card-img-top' src={movie.poster_path} alt={movie.title} />
                </div>


                <div className="col-sm-7 col-lg-8">
                  <div className="card-body" >
                    <h4 className="card-title ">{movie.title}</h4>
                    <ul className="list-group list-group-flush ">
                      <li className="list-group-item  px-0">Average: {movie.average}</li>
                      <li className="list-group-item  px-0">Year: {movie.release}</li>
                      <li className="list-group-item  px-0">Language: {movie.language}</li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <a href="#" className="btn btn-success mx-2">See plot</a>
                    <a href="#" onClick={() => handleDelete(user._id, movie._id)} className="btn btn-danger">Remove</a>

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

export default connect(mapStateToProps, { deleteMovie })(Profile)
