import React,{Fragment} from 'react'

import {Link} from 'react-router-dom';





 const Header = () => {
    return (
        <Fragment>
                <header className='container-fluid'>

        <nav className="navbar navbar-expand-md justify-content-between py-3">  

 
        <h2 className="navbar-brand py-2 m-0">
            <Link to="/" className='h2'><i className="fas fa-film"></i> TheFinalCut</Link>
        </h2>
       
        <ul className="nav d-flex py-2">
            <li className="nav-item">
                <Link className="nav-link active fs-6" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-6" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-6" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-6" to="/profile">Profile</Link>
              </li>
           
           
          </ul>
</nav>
</header>
        </Fragment>
    )
}

export default Header;
