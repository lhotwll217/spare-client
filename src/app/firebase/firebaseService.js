import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "../config/firebaseConfig";
const auth = getAuth(app);

export function signInEmail(creds) {
  // const auth = getAuth();
  createUserWithEmailAndPassword(auth, creds.email, creds.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
