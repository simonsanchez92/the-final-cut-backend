import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



import Header from './components/Header';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';


const App = ()=>{

  const [movies, getMovies] = useState()


  useEffect(()=>{
    async function fetchData(){

      const API_URL =`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4c0c205a5315c151196343cd53dbf96f&page=1`;

      const res = await axios.get(API_URL);
      const data = await res.data.results;
      getMovies(data);
    }
    fetchData();



  },[])

 
  return (
    <Router >
      
    <Header/>
    <Route exact path='/' 
           render={()=>(
             <Landing  movies={movies}/>
           )}/>

    <Switch>
  
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>

    </Switch>
    </Router>
  );
}

export default App;
