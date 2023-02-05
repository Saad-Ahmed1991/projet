import axios from "axios";
import {
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
} from "../Consts/userConsts";

//user sign up

export const userSignUp = (newUser, navigate) => async (dispatch) => {
  try {
    const respose = await axios.post(
      "http://localhost:5000/api/user/signup",
      newUser
    );
    dispatch({ type: SIGN_UP_SUCCESS, payload: respose.data });
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch({ type: SIGN_UP_FAIL, payload: error });
  }
};

//log in

export const logIn = (user, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/login",
      user
    );
    dispatch({ type: LOG_IN_SUCCESS, payload: response.data });
    if (response.data.user.role === "admin") {
      const token = localStorage.getItem("token");
      dispatch(getAllUsers(token));
    }

    if (response.data.user.hasProfile) {
      navigate("/");
    } else {
      navigate("/profile/createprofile");
    }
  } catch (error) {
    console.log("log in response", error);
    dispatch({ type: LOG_IN_FAIL, payload: error });
  }
};

//log out

export const logOut = () => {
  return { type: "LOG_OUT" };
};

//get current user

export const getCurrentUser = () => async (dispatch) => {
  dispatch({ type: "GET_CURRENT_USER_LOADING" });
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:5000/api/user/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "GET_CURRENT_USER_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_CURRENT_USER_FAIL", payload: error });
  }
};

// get all users

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USERS_LOADING });

  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:5000/api/user/allusers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error });
  }
};
