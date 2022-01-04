import axios from "axios";

import {
  AUTH_ERROR,
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

import setAlert from "../utils/setAlert";

import { loadFavourites } from "./movies";

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const newUser = { name, email, password };

    const body = JSON.stringify(newUser);

    try {
      // const res = await axios.post(
      //   "http://localhost:5000/api/v1/auth/register",
      //   body,
      //   config
      // );
      const res = await axios.post(`/api/v1/auth/register`, body, config);

      setAlert("success", "User registered!");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const error = err.response.data.msg;

      setAlert("error", error);

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    // const instance = axios.create({
    //   baseURL: "http://localhost:5000/api/v1/auth/",
    // });

    const instance = axios.create({
      baseURL: `api/v1/auth/`,
    });

    instance.defaults.headers.common["x-auth-token"] = localStorage.token;
    //   const res = await axios.get('http://localhost:5000/api/v1/auth/');

    const res = await instance.get("/");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    dispatch(loadFavourites(res.data.data._id));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const newUser = {
    email,
    password,
  };
  const body = JSON.stringify(newUser);

  try {
    // const res = await axios.post(
    //   "http://localhost:5000/api/v1/auth/login",
    //   body,
    //   config
    // );

    const res = await axios.post(`/api/v1/auth/login`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    setAlert("success", `Welcome!`);
  } catch (err) {
    setAlert("error", `${err.response.data.msg}`);

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });

  setAlert("error", "User logged out");
};
