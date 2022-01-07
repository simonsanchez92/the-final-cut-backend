import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../actions/auth";

import setAlert from "../utils/setAlert";

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      const { email, password } = formData;
      login(email, password);
    } else if (!formData.email || !formData.password) {
      setAlert("warning", "You have missing fields...");
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <main className="login">
      <section
        className="register-box
    container
    py-5
    my-4
    d-flex
    flex-column
    justify-content-center
    align-items-center"
      >
        <h1 className="h1 pb-3">Sign In</h1>

        <p className="text-start">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>

        <form className="register-form py-3 container d-flex flex-column">
          <div className="mb-3">
            <input
              type="text"
              className="form-control "
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password1"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary register-btn"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>

        <p className="my-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-info">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
