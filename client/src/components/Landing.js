import React, { Fragment, useEffect } from "react";

import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";

import { connect } from "react-redux";

import { paginate } from "../actions/movies";
import { getMovies } from "../actions/movies";

const Landing = ({ movies, searchStr, page, paginate, getMovies }) => {
  //   const [genres, setGenres] = useState()

  //   useEffect(()=>{
  //     async function fetchData(){
  //       const API_URL =`https://api.themoviedb.org/3/genre/movie/list?api_key=4c0c205a5315c151196343cd53dbf96f&language=en-US`;

  //       const res = await axios.get(API_URL);
  //       const data = await res.data.genres;
  //       setGenres(data);
  //     }
  //     fetchData();
  //   },[])

  useEffect(() => {
    getMovies(1);
  }, [getMovies]);

  return (
    <Fragment>
      <SearchBar />
      <main className="main" id="main">
        <h2 id="search-text">Best rated Movies:</h2>

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
