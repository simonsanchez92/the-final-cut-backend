import{
    USER_LOADED,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null
    // loading: true,
}

export default function(state = initialState, action){    
    const {type, payload} = action;
    
    switch(type){
        case USER_LOADED:
            return {
                ...state, 
                loading: false,
                isAuthenticated: true,
                user: payload.data
            }
            
         case REGISTER_SUCCESS:
         case LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token);
        return {
            ...state,
            ...payload,
            isAuthenticated: true
        }

        // case REGISTER_FAIL:
        // case ACCOUNT_DELETED:
        
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
        localStorage.removeItem('token');
        
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }
        
        default:
        return state;
    }
}