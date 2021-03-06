import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import {app} from "../config/firebaseConfig";
import {setUserProfileData} from "./firestoreService";
import {
  getDatabase,
  set,
  ref as ref_db,
  serverTimestamp,
  push,
} from "firebase/database";
const storage = getStorage();
const database = getDatabase();

export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map((e) =>
      Object.assign({}, e[1], {id: e[0]})
    );
  }
}
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

export function uploadPhotosToFirebaseStorage(file, filename) {
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

export function addEventMessage(listerId, listingId, listingTitle, message) {
  const user = getAuth().currentUser;
  const messageListRef = ref_db(database, `/messages/${listerId}`);
  const newMessageRef = push(messageListRef);

  const newMessage = {
    sentBy: {
      displayName: user.displayName,
      photoURL:
        user.photoURL ||
        "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      email: user.email,
      uid: user.uid,
    },
    text: message.message,
    date: serverTimestamp(),
    listing: {
      title: listingTitle,
      uid: listingId,
    },
  };

  return set(newMessageRef, newMessage);
}

// export function listenToMessages() {
//   const user = getAuth().currentUser;
//   if (user) {
//     const messageRef = ref_db(database, `/messages/${user.uid}`);
//     onChildAdded(messageRef, (data) => {
//       console.log(data.val());
//     });
//   }
// }

export function firebaseMessageQuery() {
  const user = getAuth().currentUser;

  if (user) {
    return ref_db(database, `/messages/${user.uid}`);
  }
}

export async function deleteAllUserProfilePhotos() {
  const user = getAuth().currentUser;

  const photoRef = ref(storage, `${user.uid}/user_images`);
  const fileRefs = await listAll(photoRef);

  try {
    fileRefs.items.forEach(async (ref) => {
      await deleteObject(ref);
    });
  } catch (error) {
    throw error;
  }
}
