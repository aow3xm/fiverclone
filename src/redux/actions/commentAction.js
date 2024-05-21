
import {
  layDanhSachBinhLuan,
  themBinhLuan,
} from "../../services/commentService";

export const FETCH_COMMENTS_REQUEST = "comments/fetchCommentsRequest";
export const FETCH_COMMENTS_SUCCESS = "comments/fetchCommentsSuccess";
export const POST_COMMENT_REQUEST = "comments/postCommentRequest";
export const POST_COMMENT_SUCCESS = "comments/postCommentSuccess";

export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST,
});

export const fetchCommentsSuccess = (comments) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export const postCommentRequest = () => ({
  type: POST_COMMENT_REQUEST,
});

export const postCommentSuccess = (comment) => ({
  type: POST_COMMENT_SUCCESS,
  payload: comment,
});

export const fetchComments = (idCongViec) => {
  return async (dispatch) => {
    dispatch(fetchCommentsRequest());
    try {
      const data = await layDanhSachBinhLuan(idCongViec);
      dispatch(fetchCommentsSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const postComment = (comment, token) => {
  return async (dispatch) => {
    dispatch(postCommentRequest());
    try {
      const data = await themBinhLuan(comment, token);
      dispatch(postCommentSuccess(data));

    } catch (error) {}
  };
};
