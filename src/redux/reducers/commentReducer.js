// commentsReducer.js
import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
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
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        commentsList: [...state.commentsList, action.payload],
      };
    case POST_COMMENT_REQUEST:
      return { ...state };
    default:
      return state;
  }
};

export default commentsReducer;
