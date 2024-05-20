// commentsReducer.js
import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
} from "../actions/commentAction";

const initialState = {
  commentsList: [],
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return { ...state };
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, commentsList: action.payload };
    default:
      return state;
  }
};

export default commentsReducer;