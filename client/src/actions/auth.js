import axios from 'axios';

import {
    USER_LOADED,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    AUTH_ERROR,
    CLEAR_PROFILE
} from './types';

import setAuthToken from '../utils/setAuthToken';


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
    })

    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)

        dispatch({
            type: REGISTER_FAIL  
        });
    }
}



export const loadUser = ()=> async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('http://localhost:5000/api/v1/auth/');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
        console.log(err)
    }
}
export const logout = ()=> async dispatch=>{

    
  
        dispatch({
            type: LOGOUT
        });
}
