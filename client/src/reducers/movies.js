
import {
          MOVIES_LOAD_SUCCESS,
          MOVIES_LOAD_FAIL,
          ADD_FAVOURITE,
          ADD_FAVOURITE_FAIL,
          LOAD_FAVOURITES,
          LOAD_FAVOURITES_FAIL,
          LOGOUT} from '../actions/types';


const initialState = {
    movies: [],
    favourites: []
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case MOVIES_LOAD_SUCCESS:
        return {
            ...state,
            movies: payload.data.results
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
        default:
        return state
    }
}


         