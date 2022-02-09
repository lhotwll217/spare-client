import {SIGN_IN_USER, SIGN_OUT_USER} from "./authConstants";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export function signInUser(payload) {
  return {
    type: SIGN_IN_USER,
    payload,
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
//Dispatch this action in the configure store method so we the auth state is listened to continuously
export function verifyAuth() {
  //Return a function with dispatch from the store
  return function (dispatch) {
    const auth = getAuth();
    //Adds an onserver for changers to the user's sign-in state, returns a Firebase user object.
    return onAuthStateChanged(auth, (user) => {
      //If there is user allready in storage then dispatch a sugn-in action after retrieving the user object from the store.
      if (user) {
        dispatch({type: SIGN_IN_USER, payload: user});
      } else {
        dispatch(signOutUser());
      }
    });
  };
}
