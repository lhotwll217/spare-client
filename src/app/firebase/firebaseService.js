import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {app} from "../config/firebaseConfig";
import {setUserProfileData} from "./firestoreService";
import {getDatabase, set, ref as ref_db} from "firebase/database";
const storage = getStorage();
const database = getDatabase();
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
  const storageRef = ref(storage, `${user.uid}/user_images/${filename}`);
  return uploadBytes(storageRef, file);
}
export function firebaseDownloadURL(path) {
  return getDownloadURL(ref(storage, path));
}
export function updateAuthProfilePhoto(user, downloadURL) {
  return updateProfile(user, {photoURL: downloadURL});
}

export function uploadListingPhotos(file, filename, listingId) {
  const storageRef = ref(storage, `listingPhotos/${listingId}/${filename}`);
  return uploadBytes(storageRef, file);
}

export function addEventMessage(listerId, listingId, message) {
  const user = getAuth().currentUser;

  const newMessage = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    uid: user.uid,
    text: message,
    date: Date.now(),
  };

  set(
    ref_db(database, `chat/${listerId}/${listingId}/${user.uid}`, newMessage)
  );
}
