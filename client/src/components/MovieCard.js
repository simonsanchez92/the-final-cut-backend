import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFavourite, deleteMovie, getSingleMovie } from "../actions/movies";

import setAlert from "../utils/setAlert";

import defaultPoster from "../img/default.png";

const MovieCard = ({
  movie,
  addFavourite,
  deleteMovie,
  getSingleMovie,
  user,
  favourites,
}) => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const {
    poster_path,
    backdrop_path,
    vote_average,
    original_title,
    release_date,
    overview,
    original_language,
    id,
  } = movie;

  const add = () => {
    if (user) {
      const newMovie = {
        user: user._id,
        title: original_title,
        average: vote_average,
        release: release_date,
        language: original_language,
        overview: overview,
        poster_path: IMG_PATH + poster_path,
        backdrop_path: IMG_PATH + backdrop_path,
        original_id: id,
      };
      addFavourite(newMovie);
    } else {
      setAlert("error", "You must be logged in");
    }
  };

  const handleDelete = (userId, movieId) => {
    favourites.forEach((movie) => {
      if (movie.original_id === movieId) {
        deleteMovie(userId, movie._id);
      }
    });
  };

  //Determine whether movie is in user's favourites
  const favouriteBtn = (movieId) => {
    return favourites.some((movie) => movie.original_id === movieId);
  };

  return (
    <div className="movie-card">
      <div className="movie-img-container">
        <img
          src={poster_path !== null ? IMG_PATH + poster_path : defaultPoster}
          alt={original_title}
        />

        <div className="card-overlay">
          <div className="movie-title">
            <i className="fas fa-video"></i>
            <span>{original_title}</span>
          </div>
          <div className="card-btns">
            <span onClick={() => getSingleMovie(id)}>
              <Link
                to={{
                  pathname: `movies/${id}`,
                }}
              >
                <i className=" fas fa-plus"></i> See more
              </Link>
            </span>

            {favouriteBtn(id) ? (
              <Fragment>
                <i
                  onClick={() => handleDelete(user._id, id)}
                  className="fas fa-star"
                ></i>
              </Fragment>
            ) : (
              <Fragment>
                <i onClick={() => add()} className="far fa-star "></i>
              </Fragment>
            )}
          </div>
        </div>
      </div>

      <div className="title-year-box">
        <span>
          <b>{original_title}</b>
        </span>
        <span>{!release_date ? "" : release_date.split("-")[0]}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  movie: ownProps.movie,
  user: state.auth.user,
  favourites: state.movies.favourites,
});

export default connect(mapStateToProps, {
  addFavourite,
  getSingleMovie,
  deleteMovie,
})(MovieCard);
