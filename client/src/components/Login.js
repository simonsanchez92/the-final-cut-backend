import React, {Fragment} from 'react'






const Login = () => {
    return (
        
            <section className="register-box
    container
    py-5
    my-4
    d-flex
    flex-column
    justify-content-center
    align-items-center">

<h3 className='large'>Sign In</h3>

<p className='text-start'><i className="fas fa-user"></i> Sign into Your Account</p>

<form className='form py-3'>

<div className="mb-3">

  <input type="text"
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

<button type="submit" className="btn btn-primary register-btn">Submit</button>
</form>

<p className="my-2">
Don't have an account? <a href="register.html" className='text-info'>Register</a>
</p>


</section>
       
    )

}


export default Login;
