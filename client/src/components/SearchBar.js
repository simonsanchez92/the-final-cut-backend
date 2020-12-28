import React from 'react'



 const SearchBar = () => {
    return (
             <div className="search-container container-fluid d-flex justify-content-center" 
                  id='search-container'>

            <form className='search-form py-4 px-1' id='search-form'>
        
            <div className="input-group ">

        <input className="search-input form-control" 
               type="text" 
               placeholder='Begin your search...'  
               id='search-input'/>

        <input className='search-form search-Btn btn'
               value='Search'
               type='button'
               id='searchBtn'
               placeholder=""/>
         </div>
       
    </form>
</div>
    )
}


export default SearchBar;
