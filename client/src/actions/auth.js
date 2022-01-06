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
    //In case passwords matched
    if (password) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const newUser = { name, email, password };
      const body = JSON.stringify(newUser);

      try {
        const res = await axios.post(`/api/v1/auth/register`, body, config);

        setAlert("success", "User registered!");
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });

        dispatch(loadUser());
      } catch (err) {
        const errorMsg = err.response.data.msg;
        setAlert("error", errorMsg);
        dispatch({
          type: REGISTER_FAIL,
        });
      }
    } else {
      setAlert("error", "Passwords do not match");
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    try {
      const instance = axios.create({
        baseURL: `/api/v1/auth/`,
      });

      instance.defaults.headers.common["x-auth-token"] = localStorage.token;

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
  } else {
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
    const res = await axios.post(`/api/v1/auth/login`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    setAlert("success", `Welcome!`);
  } catch (err) {
    console.log(err.response);
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
