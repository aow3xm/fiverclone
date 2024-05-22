import { signIn, signUp, updateProfile, getUser, uploadAvatar as uploadAvatarService } from "../../services/userService";
import { message } from "antd";
import { userLocal } from "../../services/userLocal";

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
export const UPLOAD_AVATAR_REQUEST = "UPLOAD_AVATAR_REQUEST";
export const UPLOAD_AVATAR_SUCCESS = "UPLOAD_AVATAR_SUCCESS";
export const UPLOAD_AVATAR_FAILURE = "UPLOAD_AVATAR_FAILURE";
const signupRequest = () => ({ type: SIGNUP_REQUEST });
const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });
const getUserSuccess = (user) => ({ type: GET_USER_INFO, payload: user });
const uploadAvatarRequest = () => ({ type: UPLOAD_AVATAR_REQUEST });
const uploadAvatarSuccess = (avatarUrl) => ({ type: UPLOAD_AVATAR_SUCCESS, payload: avatarUrl });
const uploadAvatarFailure = (error) => ({ type: UPLOAD_AVATAR_FAILURE, payload: error });

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

const logoutRequest = () => ({ type: LOGOUT_REQUEST  });
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS});
const logoutFailure = (error) => ({ type: LOGOUT_FAILURE, payload: error });
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
      console.log(user);
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

export const uploadAvatar = (avatar) => {
  return async (dispatch) => {
    dispatch(uploadAvatarRequest());
    try {
      const response = await uploadAvatarService(avatar);
      const avatarUrl = response.data.content.avatarUrl; // Giả sử API trả về URL của avatar trong `content.avatarUrl`
      dispatch(uploadAvatarSuccess(avatarUrl));
      message.success("Upload Avatar Successful");
    } catch (error) {
      const errorMessage = error.response?.data?.content || "Upload Avatar Failed";
      dispatch(uploadAvatarFailure(errorMessage));
      message.error(errorMessage);
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