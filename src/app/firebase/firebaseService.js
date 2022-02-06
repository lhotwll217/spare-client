import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "../config/firebaseConfig";
// const auth = getAuth(app);

export async function signInEmail(creds) {
  const auth = getAuth(app);

  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );
    console.log(result);
    return result.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
