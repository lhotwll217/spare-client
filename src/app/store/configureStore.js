import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import {verifyAuth} from "../../features/auth/authActions";

//composeWuthDevTools always us to use more middleware
export function configureStore() {
  //Define our store so we can use it before returning it
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  //Set auth state depending on whether we have a Firebase user in local storage
  store.dispatch(verifyAuth());

  return store;
}
