import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { connect } from "react-redux";

import { searchMovies, setSearchStr } from "../actions/movies";

const SearchBar = ({ setSearchStr, searchMovies }) => {
  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData !== "") {
      setSearchStr(formData);
      searchMovies(formData);
      setFormData("");
      history.push("/search");
    }
  };

  return (
    <div
      className="search-container container-fluid d-flex justify-content-center mb-5 mt-2"
      id="search-container"
    >
      <form className="search-form  my-2" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group ">
          <input
            className="search-input form-control"
            type="text"
            placeholder="Begin your search..."
            onChange={(e) => handleChange(e)}
            value={formData}
            id="search-input"
          />

          <input
            className="btn btn-primary btn-sm "
            value="Search"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { searchMovies, setSearchStr })(
  SearchBar
);
