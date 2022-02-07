import {combineReducers} from "redux";
import authReducer from "../../features/auth/authReducer";
import testReducer from "../../features/sandbox/testReducer";
import asyncReducer from "../async/asyncReducer";
import modalReducer from "../common/modals/modalReducer";
import listingsReducer from "../../features/listings/listingsReducer.js";

const rootReducer = combineReducers({
  test: testReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  listings: listingsReducer,
});

export default rootReducer;
