import {
  signIn,
  signUp,
  updateProfile,
  getUser,
  layDanhSachCongViecDaThue,
} from "../../services/userService";
import { message } from "antd";
import { userLocal } from "../../services/userLocal";
import { thueCongViec, xoaCongViec } from "../../services/jobsService";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const INIT_USER_FROM_STORAGE = "INIT_USER_FROM_STORAGE";
export const GET_USER_INFO = "GET_USER_INFO";
export const GET_RENT_JOBS = "GET_RENT_JOBS";
const signupRequest = () => ({ type: SIGNUP_REQUEST });
const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });
const getUserSuccess = (user) => ({ type: GET_USER_INFO, payload: user });

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

const logoutRequest = () => ({ type: LOGOUT_REQUEST });
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
const logoutFailure = (error) => ({ type: LOGOUT_FAILURE, payload: error });

const getRentJobs = (jobs) => ({ type: GET_RENT_JOBS, payload: jobs });
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
      console.log(error);
      const errorMessage = error.response.data.content || "Signup Failed";
      dispatch(signupFailure(errorMessage));
      message.error(errorMessage);
    }
  };
};

export const updateUser = (id, data) => {
  return async (dispatch) => {
    try {
      await updateProfile(id, data);
      message.success("Update Successful");
    } catch (error) {
      message.error("Update Failed");
    }
  };
};

export const getUserInfo = (id) => {
  return async (dispatch) => {
    try {
      const response = await getUser(id);
      dispatch(getUserSuccess(response.data.content));
    } catch (error) {
      message.error("Get User Failed");
    }
  };
};

export const getRentJobsAction = (token) => {
  return async (dispatch) => {
    try {
      const response = await layDanhSachCongViecDaThue(token);
      dispatch(getRentJobs(response.data.content));
    } catch (error) {
      message.error("Get Rent Jobs Failed");
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutRequest());
    try {
      userLocal.delete();
      dispatch(logoutSuccess());
      message.success("Logout Successful");
    } catch (error) {
      const errorMessage = error.message || "Logout Failed";
      dispatch(logoutFailure(errorMessage));
      message.error(errorMessage);
    }
  };
};

export const rentJob = (data, token) => {
  return async (dispatch) => {
    try {
      const response = await thueCongViec(data, token);
      message.success(response.message);
    } catch (error) {
      message.error("Rent Job Failed");
    }
  };
};
export const removeRentJob = (id, token) => {
  return async (dispatch) => {
    try {
      await xoaCongViec(id, token);
      dispatch(getRentJobsAction(token));
    } catch (error) {
      console.error(error);
    }
  };
};
