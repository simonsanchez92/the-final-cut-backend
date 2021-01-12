import axios from 'axios';

import { MOVIES_LOAD_FAIL,
         MOVIES_LOAD_SUCCESS,
         ADD_FAVOURITE,
         ADD_FAVOURITE_FAIL,
         LOAD_FAVOURITES,
         LOAD_FAVOURITES_FAIL} from './types';


export const getAllMovies = (page) => async dispatch =>{

    delete axios.defaults.headers.common['x-auth-token'];

    try {
        const res = await axios.get(`http://localhost:5000/api/v1/movies/${page}`);

        dispatch({
            type: MOVIES_LOAD_SUCCESS,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: MOVIES_LOAD_FAIL
        })
    }
}


export const addFavourite = (movie)=> async dispatch=>{

    const {user, title, average, release, language, overview, poster_path, original_id} = movie;
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const newMovie = {
            user,
            title,
            average,
            release,
            language,
            overview,
            poster_path,
            original_id
    }

    const body = JSON.stringify(newMovie);

    try {
     const res = await axios.post('http://localhost:5000/api/v1/movies', body, config);
    
     dispatch({
         type: ADD_FAVOURITE,
         payload: res.data
     })

    } catch (err) {
       
        dispatch({
            type: ADD_FAVOURITE_FAIL  
        });
    }

}

export const loadFavourites = (user)=> async dispatch=>{

        try {

            const res = await axios.get(`http://localhost:5000/api/v1/users/${user}/favs`);

            dispatch({
                type: LOAD_FAVOURITES,
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: LOAD_FAVOURITES_FAIL
            })
        }

        
}