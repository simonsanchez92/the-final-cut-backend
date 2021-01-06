import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



import Header from './components/Header';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Movie from './components/Movie';


import {Provider} from 'react-redux';
import store from './store';

import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';



if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = ()=>{

  // const [movies, setMovies] = useState();

  // const [page, setPage] = useState(1);

  // const paginate = (page)=>{
  //   setPage(page);
  //   fetchData(page);
  // }

  // const fetchData = async(page)=>{
  //   console.log(`Page is ${page}`)
  //   const API_URL =`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4c0c205a5315c151196343cd53dbf96f&page=${page}`;
  //   const res = await axios.get(API_URL);
  //   const data = await res.data.results;
  //   setMovies(data);
  // }

  // useEffect(()=>{ 
  //   fetchData(page);
  // },[])

 

  useEffect(()=>{ 
    store.dispatch(loadUser());
  },[])
 
  return (
    <Provider store={store}>


    <Router >
      
      <Header/>
      {/* <Route exact path='/' 
           render={()=>(
             <Landing  movies={movies} page={page} paginate={paginate}/>
           )}/> */}
 
    <Switch>

    

  
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/movies/:id' component={Movie}/>

    </Switch>
            </Router>

      </Provider>
  );
}

export default App;
