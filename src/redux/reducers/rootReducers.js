import { combineReducers } from "redux";
import jobsReducer from "./jobsReducer";
import commentsReducer from "./commentReducer";

const rootReducer = combineReducers({
  jobs: jobsReducer,
  comments: commentsReducer
});

export default rootReducer;
