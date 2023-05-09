import { combineReducers, createStore } from "redux";
import { UserReducer } from "../reducers/UserReducer.js";
import { ResumeReducer } from "../reducers/ResumeReducer.js";

let initialState = {
  user: {},
};

const allReducers = combineReducers({
  user: UserReducer,
  resume: ResumeReducer,

  // todo
  // admin:
});

const reduxStore = createStore(allReducers, initialState);

export default reduxStore;
