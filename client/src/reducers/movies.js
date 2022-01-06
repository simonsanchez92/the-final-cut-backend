import {
  MOVIES_LOAD_SUCCESS,
  MOVIE_LOADED,
  SEARCH_SUCCESS,
  SET_SEARCH_STR,
  ADD_FAVOURITE,
  LOAD_FAVOURITES,
  LOGOUT,
  MOVIE_DELETED,
  PAGINATE_SUCCESS,
  UPDATE_PAGE,
  SEARCH_FAIL,
} from "../actions/types";

const initialState = {
  searchStr: "",
  page: 1,
  movies: [],
  favourites: [],
  currentMovie: [],
};

export default function moviesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MOVIES_LOAD_SUCCESS:
    case SEARCH_SUCCESS:
      return {
        ...state,
        movies: payload.data.results,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        movies: [],
      };
    case MOVIE_LOADED:
      return {
        ...state,
        currentMovie: payload,
      };

    case SET_SEARCH_STR:
      return {
        ...state,
        page: 1,
        searchStr: payload,
      };
    case PAGINATE_SUCCESS:
      return {
        ...state,
        page: payload.page,
        movies: payload.data.results,
      };
    case UPDATE_PAGE:
      return {
        ...state,
        page: payload,
      };
    case ADD_FAVOURITE:
      return {
        ...state,
        favourites: [...state.favourites, payload.data],
      };

    case LOAD_FAVOURITES:
      return {
        ...state,
        favourites: payload.data,
      };
    case LOGOUT:
      return {
        ...state,
        favourites: [],
      };
    case MOVIE_DELETED: {
      return {
        ...state,
        favourites: state.favourites.filter(
          (movie) => movie._id !== payload.id
        ),
      };
    }
    default:
      return state;
  }
}
