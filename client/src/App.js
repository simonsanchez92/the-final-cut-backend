import React,{useEffect} from 'react';

import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



import Header from './components/Header';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Movie from './components/Movie';


import {Provider} from 'react-redux';
import {store} from './store';

import {loadUser} from './actions/auth';



import {getMovies} from './actions/movies';



const App = ()=>{



  useEffect(()=>{ 
    store.dispatch(getMovies(1));
  },[])

  

  useEffect(()=>{ 
    store.dispatch(loadUser());
  },[])
 
  return (
    <Provider store={store}>


    <Router >
      
      <Header/>
      <Route exact path='/' component={Landing}/>
 
    <Switch>  

      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/movies/:id' component={Movie}/>

    </Switch>
            </Router>

      </Provider>
  );
}

const mapStateToProps = state=>({

})

export default App;
