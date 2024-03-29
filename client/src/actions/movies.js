import axios from "axios";

import {
  MOVIES_LOAD_FAIL,
  MOVIES_LOAD_SUCCESS,
  MOVIE_LOADED,
  MOVIE_LOADED_FAIL,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  ADD_FAVOURITE,
  ADD_FAVOURITE_FAIL,
  LOAD_FAVOURITES,
  LOAD_FAVOURITES_FAIL,
  MOVIE_DELETED,
  DELETE_MOVIE_FAIL,
  SET_SEARCH_STR,
  UPDATE_PAGE,
  PAGINATE_SUCCESS,
  PAGINATE_FAIL,
} from "./types";

import setAlert from "../utils/setAlert";

export const getMovies = (page) => async (dispatch) => {
  try {
    // const res = await axios.get(`http://localhost:5000/api/v1/movies/${page}`);
    const res = await axios.get(`/api/v1/movies/${page}`);

    dispatch({
      type: MOVIES_LOAD_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MOVIES_LOAD_FAIL,
    });
  }
};

export const getSingleMovie = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      ` https://api.themoviedb.org/3/movie/${id}?api_key=4c0c205a5315c151196343cd53dbf96f&language=en-US`
    );

    dispatch({
      type: MOVIE_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MOVIE_LOADED_FAIL,
    });
  }
};

export const setSearchStr = (string) => async (dispatch) => {
  try {
    dispatch({
      type: SET_SEARCH_STR,
      payload: string,
    });
  } catch (err) {
    console.log(err);
  }
};

export const searchMovies = (title) => async (dispatch) => {
  try {
    // const res = await axios.get(
    //   `http://localhost:5000/api/v1/movies/search/${title}/1`
    // );

    const res = await axios.get(`/api/v1/movies/search/${title}/1`);

    dispatch({
      type: SEARCH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_FAIL,
    });
  }
};

export const paginate = (searchStr, page) => async (dispatch) => {
  try {
    // const res = await axios.get(
    //   `http://localhost:5000/api/v1/movies/search/${searchStr}/${page}`
    // );

    const res = await axios.get(`/api/v1/movies/search/${searchStr}/${page}`);

    dispatch({
      type: PAGINATE_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: UPDATE_PAGE,
      payload: page,
    });
  } catch (err) {
    dispatch({
      type: PAGINATE_FAIL,
    });
  }
};

export const addFavourite = (movie) => async (dispatch) => {
  const {
    user,
    title,
    average,
    release,
    language,
    overview,
    poster_path,
    backdrop_path,
    original_id,
  } = movie;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const newMovie = {
    user,
    title,
    average,
    release,
    language,
    overview,
    poster_path,
    backdrop_path,
    original_id,
  };

  const body = JSON.stringify(newMovie);

  try {
    // const res = await axios.post(
    //   "http://localhost:5000/api/v1/movies",
    //   body,
    //   config
    // );
    const res = await axios.post(`/api/v1/movies`, body, config);

    setAlert("success", "Movie added!");

    dispatch({
      type: ADD_FAVOURITE,
      payload: res.data,
    });
  } catch (err) {
    setAlert("error", "You've already added this movie");
    dispatch({
      type: ADD_FAVOURITE_FAIL,
    });
  }
};

export const loadFavourites = (user) => async (dispatch) => {
  try {
    // const res = await axios.get(
    //   `http://localhost:5000/api/v1/users/${user}/favs`
    // );
    const res = await axios.get(`/api/v1/users/${user}/favs`);

    dispatch({
      type: LOAD_FAVOURITES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_FAVOURITES_FAIL,
    });
  }
};

export const deleteMovie = (userId, movieId) => async (dispatch) => {
  try {
    // await axios.delete(
    //   `http://localhost:5000/api/v1/movies/${userId}/${movieId}`
    // );

    await axios.delete(`/api/v1/movies/${userId}/${movieId}`);

    setAlert("deleted", "Movie deleted");

    dispatch({
      type: MOVIE_DELETED,
      payload: {
        id: movieId,
      },
    });
  } catch (err) {
    dispatch({
      type: DELETE_MOVIE_FAIL,
    });
  }
};
