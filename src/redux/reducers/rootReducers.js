import { combineReducers } from "redux";
import jobsReducer from "./jobsReducer";
import commentsReducer from "./commentReducer";
import userSlice from "../userReducer/userSlice";

const rootReducer = combineReducers({
  jobs: jobsReducer,
  comments: commentsReducer,
  userReducer: userSlice,
});

export default rootReducer;
