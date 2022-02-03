import {combineReducers} from "redux";
import authReducer from "../../features/auth/authReducer";
import testReducer from "../../features/sandbox/testReducer";
import modalReducer from "../common/modals/modalReducer";

const rootReducer = combineReducers({
  test: testReducer,
  modals: modalReducer,
  auth: authReducer,
});

export default rootReducer;
