import {
  FETCH_DETAIL_JOB_SUCCESS,
  FETCH_JOBS_CATEGORIES_SUCCESS,
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOB_RESULT_SUCCESS,
  FETCH_JOB_TITLE_SUCCESS,
} from "../actions/jobsActions";

const initialState = {
  jobsList: [],
  jobsCategories: [],
  jobDetail: [],
  jobResult: [],
  jobTitle: {},
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
      return { ...state };
    case FETCH_JOBS_SUCCESS:
      return { ...state, jobsList: action.payload };
    case FETCH_JOBS_CATEGORIES_SUCCESS:
      return { ...state, jobsCategories: action.payload };
    case FETCH_DETAIL_JOB_SUCCESS:
      return { ...state, jobDetail: action.payload };
    case FETCH_JOB_RESULT_SUCCESS:
      return { ...state, jobResult: action.payload };
    case FETCH_JOB_TITLE_SUCCESS:
      return { ...state, jobTitle: action.payload };
    default:
      return state;
  }
};

export default jobsReducer;
