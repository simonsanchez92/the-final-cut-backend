import {combineReducers} from 'redux';
import auth from './auth';
import movies from './movies';

export default combineReducers({
    auth,
    movies
})