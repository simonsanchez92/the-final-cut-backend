import React, { useEffect } from "react";

import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import SearchResults from "./components/SearchResults";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Movie from "./components/Movie";

import { Provider } from "react-redux";
import { persistor, store } from "./store";

import { loadUser } from "./actions/auth";

import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <Route exact path="/" component={Landing} />

          <Switch>
            <Route exact path="/search" component={SearchResults} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/movies/:id" component={Movie} />
          </Switch>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
};

// const mapStateToProps = (state) => ({});

export default App;
