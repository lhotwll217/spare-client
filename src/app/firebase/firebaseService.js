import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {app} from "../config/firebaseConfig";
// const auth = getAuth(app);

export async function registerWithEmail(creds) {
  const auth = getAuth(app);

  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );
    return result.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signInWithEmail(creds) {
  const auth = getAuth(app);
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );
    return result.user;
  } catch (error) {
    throw error;
  }
}

export async function signOutFirebase() {
  const auth = getAuth();
  const result = await signOut(auth);
  console.log(result);
  return result;
}
