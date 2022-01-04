import React, { Fragment, useEffect } from "react";

import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";

import { connect } from "react-redux";

import { paginate } from "../actions/movies";
import { getMovies } from "../actions/movies";

const Landing = ({ movies, searchStr, page, paginate, getMovies }) => {
  useEffect(() => {
    getMovies(1);
  }, [getMovies]);

  return (
    <Fragment>
      <SearchBar />
      <main className="main" id="main">
        <h2 id="search-text" className="text-uppercase px-3 font-weight-light">
          Best rated Movies:
        </h2>

        <div className="movies-container" id="movies-container">
          {movies === undefined
            ? ""
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </main>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  page: state.movies.page,
  searchStr: state.movies.searchStr,
});

export default connect(mapStateToProps, { paginate, getMovies })(Landing);
