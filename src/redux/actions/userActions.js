import { signIn, signUp } from "../../services/userService";
import { message } from "antd";
import { userLocal } from "../../services/userLocal";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const INIT_USER_FROM_STORAGE = "INIT_USER_FROM_STORAGE";

const signupRequest = () => ({ type: SIGNUP_REQUEST });
const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const initUserFromStorage = (user) => ({
  type: INIT_USER_FROM_STORAGE,
  payload: user,
});

// Thunks
export const login = (data) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await signIn(data);
      const user = response.data.content;
      console.log(user)
      dispatch(loginSuccess(user));
      message.success("Login Successful");
      userLocal.set(user.token);
    } catch (error) {
      const errorMessage = error.response?.data?.content || "Login Failed";
      dispatch(loginFailure(errorMessage));
      message.error(errorMessage);
    }
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    dispatch(signupRequest());
    try {
      await signUp(data);
      message.success("Signup Successful");
    } catch (error) {
      const errorMessage = error.message || "Signup Failed";
      dispatch(signupFailure(errorMessage));
      message.error(errorMessage);
    }
  };
};
