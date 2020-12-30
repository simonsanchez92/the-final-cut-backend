import {createStore, applyMiddleware} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';;

import rootReducer from './reducers';

const initialState= {};


const store = createStore(rootReducer, initialState);


export default store;


