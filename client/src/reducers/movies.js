
import {
          MOVIES_LOAD_SUCCESS,
          MOVIES_LOAD_FAIL,
          MOVIE_LOADED,
          MOVIE_LOADED_FAIL,
          SEARCH_SUCCESS,
          SET_SEARCH_STR,
          ADD_FAVOURITE,
          ADD_FAVOURITE_FAIL,
          LOAD_FAVOURITES,
          LOAD_FAVOURITES_FAIL,
          LOGOUT,
          MOVIE_DELETED,
          DELETE_MOVIE_FAIL,
          PAGINATE_SUCCESS,
          PAGINATE_FAIL,
          UPDATE_PAGE,
          SEARCH_FAIL} from '../actions/types';


const initialState = {
    searchStr: '',
    page: 1,
    movies: [],
    favourites: [],
    currentMovie: []
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case MOVIES_LOAD_SUCCESS:
        case SEARCH_SUCCESS:
        
        return {
            ...state,
            movies: payload.data.results
        }
        case SEARCH_FAIL:
            return {
                ...state,
                movies: []  
            }
        case MOVIE_LOADED:
            return{
                ...state,
                currentMovie: payload
            }

        case SET_SEARCH_STR:
            return {
                ...state,
                page: 1,
                searchStr: payload
            }
        case PAGINATE_SUCCESS:
            return {
                    ...state,
                    page: payload.page,
                    movies: payload.data.results
                }
        case UPDATE_PAGE:
            return {
                ...state,
                page: payload
            }
        case ADD_FAVOURITE:
        return {
            ...state,
            favourites: [...state.favourites, payload.data]
        }
         
        case LOAD_FAVOURITES:
            return{
                ...state,
                favourites: payload.data
            }
        case LOGOUT:
            return {
                ...state,
                favourites: []
            }
        case MOVIE_DELETED:
        default:
        return state
    }
}


         