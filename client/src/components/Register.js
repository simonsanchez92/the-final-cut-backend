import React, {Fragment} from 'react'



const Register = () => {
    return (
        <Fragment>
                <section className="register-box
                container
                py-5
                my-4
                d-flex
                flex-column
                justify-content-center
                align-items-center">
       
            <h3 className='large'>Register</h3>
            <p><i className="fas fa-user"></i> Create Your Account</p>
        
        

        <form className='form py-3'>

            <div className="mb-3">
            
                <input type="text"
                       className="form-control"
                       id="name"
                       placeholder="Name"
                       required/>
              </div>

            <div className="mb-3">
            
              <input type="email"
                     className="form-control "
                     id="exampleInputEmail1"
                     placeholder="Email Address"
                     aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
            
              <input type="password"
                     className="form-control"
                     id="password1"
                     placeholder="Password"
                     minLength="6"/>
            </div>
            <div className="mb-3">
              <input type="password" 
                     className="form-control"
                     id="password2"
                     placeholder="Confirm password"
                     minLength="6"/>
            </div>
            <button type="submit" className="btn btn-primary register-btn">Submit</button>
          </form>
          <p className="my-2">
            Already have an account? <a href="login.html" className='text-info'>Sign In</a>
          </p>
    
    
</section>
        </Fragment>
    )
}


export default Register
