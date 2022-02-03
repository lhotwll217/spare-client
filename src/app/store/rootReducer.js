import {combineReducers} from "redux";
import testReducer from "../../features/sandbox/testReducer";
import modalReducer from "../common/modals/modalReducer";

const rootReducer = combineReducers({
  test: testReducer,
  modals: modalReducer,
});

export default rootReducer;
