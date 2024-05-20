import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../actions/userActions";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
