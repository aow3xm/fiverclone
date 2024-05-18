// commentAction.js
import { layDanhSachBinhLuan } from "../../services/commentService";

export const FETCH_COMMENTS_REQUEST = "comments/fetchCommentsRequest";
export const FETCH_COMMENTS_SUCCESS = "comments/fetchCommentsSuccess";

export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST,
});

export const fetchCommentsSuccess = (comments) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export const fetchComments = (idCongViec) => {
  return async (dispatch) => {
    dispatch(fetchCommentsRequest());
    try {
      const data = await layDanhSachBinhLuan(idCongViec);
      dispatch(fetchCommentsSuccess(data));
    } catch (error) {
      // Handle error here
    }
  };
};
