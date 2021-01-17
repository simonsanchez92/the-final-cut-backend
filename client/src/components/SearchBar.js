import React, {useState} from 'react'

import {connect} from 'react-redux';

import {searchMovies, setSearchStr} from '../actions/movies';


 const SearchBar = ({setSearchStr, searchMovies, page }) => {

    const [formData, setFormData]= useState('');

    const handleChange = (e)=>{
        setFormData(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(formData !== ''){
            setSearchStr(formData);
            searchMovies(formData, page);
        }
       
        setFormData('');
    }

    return (
             <div className="search-container container-fluid d-flex justify-content-center" 
                  id='search-container'>

            <form className='search-form py-4 px-1' 
                  id='search-form'
                  onSubmit={(e)=> handleSubmit(e)}>
        
            <div className="input-group ">

        <input className="search-input form-control" 
               type="text" 
               placeholder='Begin your search...'
               onChange={(e)=>handleChange(e)}
               value={formData}  
               id='search-input'/>

        <input className='search-form search-Btn btn'
               value='Search'
               type='submit'
               id='searchBtn'
               placeholder=""/>
         </div>
       
    </form>
</div>
    )
}

const mapStateToProps = state=>({
    page: state.movies.page
});

export default connect(mapStateToProps, {searchMovies, setSearchStr})(SearchBar);
