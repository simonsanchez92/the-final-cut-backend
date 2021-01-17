import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

import logger from 'redux-logger';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

const initialState= {};

// const middleware = [thunk];



const persistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['auth'] // which reducer want to store
};


const pReducer = persistReducer(persistConfig,rootReducer);
const middleware = applyMiddleware(thunk, logger);


// const store = createStore(rootReducer, initialState,composeWithDevTools(applyMiddleware(...middleware)));

const store = createStore(pReducer, initialState,composeWithDevTools(middleware));

const persistor = persistStore(store);

export default {persistor, store};

