import {
  layChiTietLoaiCongViec,
  layCongViecChiTiet,
  layCongViecTheoChiTietLoai,
  layCongViecTheoTen,
  layDanhSachCongViec,
} from "../../services/jobsService";

export const FETCH_JOBS_REQUEST = "jobs/fetchJobsRequest";
export const FETCH_JOBS_SUCCESS = "jobs/fetchJobsSuccess";
export const FETCH_JOBS_CATEGORIES_SUCCESS = "jobs/fetchJobsCategoriesSuccess";
export const FETCH_DETAIL_JOB_SUCCESS = "jobs/fetchDetailJobSuccess";
export const FETCH_JOB_RESULT_SUCCESS = "jobs/fetchJobResultSuccess";
export const FETCH_JOB_TITLE_SUCCESS = "jobs/fetchJobTitleSuccess";

export const fetchJobsRequest = () => ({
  type: FETCH_JOBS_REQUEST,
});

export const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs,
});

export const fetchJobsCategoriesSuccess = (categories) => ({
  type: FETCH_JOBS_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchJobResultSuccess = (job) => ({
  type: FETCH_JOB_RESULT_SUCCESS,
  payload: job,
});

export const fetchDetailJobSuccess = (job) => ({
  type: FETCH_DETAIL_JOB_SUCCESS,
  payload: job,
});
export const fetchJobTitleSucess = (job) => ({
  type: FETCH_JOB_TITLE_SUCCESS,
  payload: job,
});
export const fetchJobs = () => {
  return async (dispatch) => {
    dispatch(fetchJobsRequest());
    try {
      const data = await layDanhSachCongViec();
      dispatch(fetchJobsSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchJobTitle = (id) => {
  return async (dispatch) => {
    try {
      const data = await layChiTietLoaiCongViec(id);
      dispatch(fetchJobTitleSucess(data));
    } catch (error) {
      console.error(error);
    }
  };
}

export const fetchJobsCategories = (id) => {
  return async (dispatch) => {
    dispatch(fetchJobsRequest());
    try {
      const data = await layCongViecTheoChiTietLoai(id);
      dispatch(fetchJobsCategoriesSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchJobDetail = (id) => {
  return async (dispatch) => {
    try {
      const data = await layCongViecChiTiet(id);
      dispatch(fetchDetailJobSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchJobResult = (tenCongViec) => {
  return async (dispatch) => {
    try {
      const data = await layCongViecTheoTen(tenCongViec);
      dispatch(fetchJobResultSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };
};