import axios from 'axios';

import {
    AUTH_ERROR,
    USER_LOADED,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
    
} from './types';

import setAuthToken from '../utils/setAuthToken';

import {loadFavourites} from './movies';


export const register = ({name, email, password})=> async dispatch =>{

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const newUser = {name, email, password};

    const body = JSON.stringify(newUser);

    try {
     const res = await axios.post('http://localhost:5000/api/v1/auth/register', body, config);
      
    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    });

    dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)

        dispatch({
            type: REGISTER_FAIL  
        });
    }
}



export const loadUser = ()=> async dispatch =>{
    // if(localStorage.token){
    //     setAuthToken(localStorage.token);
    // }

    try {

        const instance = axios.create({
            baseURL: 'http://localhost:5000/api/v1/auth/'
          });

        instance.defaults.headers.common['x-auth-token'] = localStorage.token;
    //   const res = await axios.get('http://localhost:5000/api/v1/auth/');

        const res = await instance.get('/')

        console.log(res)


        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

        dispatch(loadFavourites(res.data.data._id));

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
        console.log(err)
    }
    

}

export const login = (email, password)=> async dispatch=>{

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const newUser = {
        email, password
    }
    const body = JSON.stringify(newUser)

    console.log('anubody there?')
    try {
        const res = await axios.post('http://localhost:5000/api/v1/auth/login', body, config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        
        console.log(err)
        dispatch({
            type: LOGIN_FAIL 
        });
    }
    
    
        
}

export const logout = ()=> async dispatch=>{
        dispatch({
            type: LOGOUT
        });
}
