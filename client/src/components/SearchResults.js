import React, { Fragment } from "react";

import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";

import { connect } from "react-redux";

import { paginate } from "../actions/movies";

const SearchResults = ({ movies, searchStr, page, paginate }) => {
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

  const forward = () => {
    let newPage = page + 1;
    paginate(searchStr, newPage);
  };
  const backward = () => {
    if (page > 1) {
      let newPage = page - 1;
      paginate(searchStr, newPage);
    }
  };

  return (
    <Fragment>
      <SearchBar />

      <h2 className="px-2" id="search-text ">
        Results for '{searchStr}':
      </h2>

      <div className="movies-container  d-flex flex-row justify-content-around flex-wrap px-4 pb-4">
        {movies === undefined
          ? ""
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      <div className="pagination py-4" id="pagination">
        {page === 1 ? (
          <button onClick={() => backward()} className="btn" disabled>
            <i className="far fa-hand-point-left"></i>Prev
          </button>
        ) : (
          <button onClick={() => backward()} className="btn">
            <i className="far fa-hand-point-left"></i>Prev
          </button>
        )}
        <button onClick={() => forward()} className="btn">
          Next<i className="far fa-hand-point-right"></i>
        </button>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  page: state.movies.page,
  searchStr: state.movies.searchStr,
});

export default connect(mapStateToProps, { paginate })(SearchResults);
