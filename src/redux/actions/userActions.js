
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../services/userService';
import { message } from 'antd';
import { userLocal } from '../../services/userLocal';


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (data) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await signIn(data);
      const user = response.data.content;
      dispatch(loginSuccess(user));
      message.success('Login Successful');
      userLocal.set(user.token)
    } catch (error) {
      dispatch(loginFailure(error.message));
      message.error('Login Failed');
    }
  };
};
export const signup = (data) => {
  return async (dispatch) => {
    dispatch(signupRequest());
    try {
      const response = await signUp(data);
      const user = response.data.content;
      dispatch(signupSuccess(user));
      message.success('Signup Successful');
    } catch (error) {
      dispatch(signupFailure(error.message));
      message.error('Signup Failed');
    }
  };
};
