import { combineReducers } from "redux";
import jobsReducer from "./jobsReducer";
import commentsReducer from "./commentReducer";
import authReducer from "./userReducer";

const rootReducer = combineReducers({
  jobs: jobsReducer,
  comments: commentsReducer,
  auth: authReducer,
  
});

export default rootReducer;
