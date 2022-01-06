import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const persistConfig = {
  key: "auth",
  storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);
// const middleware = applyMiddleware(thunk, logger);
const middleware = applyMiddleware(thunk);

export const store = createStore(
  pReducer,
  initialState,
  composeWithDevTools(middleware)
);
export const persistor = persistStore(store);
