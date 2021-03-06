import {combineReducers} from "redux";
import authReducer from "../../features/auth/authReducer";
import testReducer from "../../features/sandbox/testReducer";
import asyncReducer from "../async/asyncReducer";
import modalReducer from "../common/modals/modalReducer";
import listingsReducer from "../../features/listings/listingsReducer.js";
import profileReducer from "../../features/profile/profileReducer";
import {messagesReducer} from "../../features/messages/messagesReducer";

const rootReducer = combineReducers({
  test: testReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  listings: listingsReducer,
  profile: profileReducer,
  messages: messagesReducer,
});

export default rootReducer;
