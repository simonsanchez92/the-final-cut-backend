import React, {Fragment} from 'react'

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';





const Profile = ({isAuthenticated, favs}) => {

    if(!isAuthenticated){
        return <Redirect to='/'/>
    }

    return (
        <main className='container-fluid my-4 px-4'>
          {favs.length > 0 ? <Fragment> <h2 className='text-justify-left'>My favourite films</h2></Fragment>:
           <Fragment><h2>You haven't added any movies yet</h2></Fragment>}
     
      

      <section className="
      profile-movies
      container-fluid
      py-4">
      
     
         
        {favs && favs.map(movie=>{
        return <Fragment>
           <div className="card mb-4 profile-movie" >
          <div className="row no-gutters justify-content-left">
           <div className="col-sm-4 col-lg-2">
            <img className='card-img-top' src={movie.poster_path} alt={movie.title}/>
          </div>


          <div className="col-sm-7 col-lg-8">
            <div className="card-body">
              <h4 className="card-title ">{movie.title}</h4>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item  px-0">Average: {movie.average}</li>
                <li className="list-group-item  px-0">Year: {movie.release}</li>
                <li className="list-group-item  px-0">Language: {movie.language}</li>
              </ul>
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-success mx-2">See plot</a>
              <a href="#" className="btn btn-danger">Remove</a>
            
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


const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated,
  favs: state.movies.favourites
})

export default connect(mapStateToProps)(Profile)
