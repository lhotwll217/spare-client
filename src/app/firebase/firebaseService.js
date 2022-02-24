import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {getStorage, ref} from "firebase/storage";
import {app} from "../config/firebaseConfig";
import {setUserProfileData} from "./firestoreService";
const storage = getStorage(app);

export async function registerWithEmail(creds) {
  const auth = getAuth(app);

  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );
    await updateProfile(result.user, {
      displayName: creds.displayName,
    });
    return await setUserProfileData(result.user);
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
  return result;
}

export function uploadToFirebaseStorage(file, filename) {
  const user = getAuth().currentUser;
  const storageRef = ref(storage);
  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

export function updateUserProfilePhoto(user, downloadURL) {
  return updateProfile(user, {photoURL: downloadURL});
}
