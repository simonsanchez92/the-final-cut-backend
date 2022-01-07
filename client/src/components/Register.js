import React, { Fragment, useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { register } from "../actions/auth";
import setAlert from "../utils/setAlert";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkFields()) {
      if (password === password2) {
        register({ name, email, password });
      } else {
        register({});
      }
    } else {
      setAlert("warning", "You have missing fields...");
    }
  };
  const checkFields = () => {
    const fields = [name, email, password, password2];
    return !fields.some((field) => field === "");
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
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
        <h1 className="h1 pb-3">Register</h1>
        <p>
          <i className="fas fa-user"></i> Create Your Account
        </p>

        <form
          className="register-form py-3 container d-flex flex-column"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="my-2">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="my-2">
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              name="email"
              placeholder="Email Address"
              value={email}
              aria-describedby="emailHelp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-2">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              minLength="6"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-2">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              placeholder="Confirm password"
              value={password2}
              minLength="6"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </form>
        <p className="my-2">
          Already have an account?{" "}
          <Link to="/login" className="text-info">
            Sign In
          </Link>
        </p>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
