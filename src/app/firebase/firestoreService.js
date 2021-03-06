import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  deleteDoc,
  getDocs,
  writeBatch,
  collectionGroup,
} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {app} from "../config/firebaseConfig";
import {
  firebaseDownloadURL,
  updateAuthProfilePhoto,
  uploadListingPhotos,
} from "./firebaseService";
import cuid from "cuid";
import {deleteObject, getStorage, ref, listAll} from "firebase/storage";
const auth = getAuth(app);
const db = getFirestore(app);

//Firestore Data Shaper - it takes each snapshot, converts it into usable data. It also creates an property out of the uid that is part of the snapshot. Finds all Firestore timestamps and converts them with toDate()
export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    //The hasOwnProperty() method returns a boolean indicating whether the object has the specified property as it's own property (as opposed to inheriting it).
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {...data, id: snapshot.id};
}
export async function addListing(values) {
  const user = auth.currentUser;

  try {
    const docRef = await addDoc(collection(db, "listings"), {
      title: values.title,
      listDetails: values.listDetails,
      tradeDetails: values.tradeDetails,
      availStart: values.availStart,
      availEnd: values.availEnd,
      location: {
        address: values.location.address,
        latLng: values.location.latLng,
      },
      lister: {
        displayName: user.displayName,
        uid: user.uid,
        photoURL:
          user.photoURL ||
          "https://ballstatepbs.org/wp-content/uploads/2019/07/generic-female-profile-picture-8.jpg",
      },
      created_at: serverTimestamp(),
    });
    return docRef;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function getListingsFromFirestore() {
  return collection(db, "listings");
}
// This is called in our firebase registerWithEmail function to creat corresponding user document we can add custom properties to since firebase auth user instances are have limited properties
export async function setUserProfileData(user) {
  try {
    //Finds or creates collection to add document to
    let collectionRef = await collection(db, "users");
    //SetDoc allows you to explicitly define the uid, the doc is created within the setDoc using 'doc' passing the collection to creat it in as well as the name.
    let newUserDoc = await setDoc(doc(collectionRef, user.uid), {
      email: user.email,
      displayName: user.displayName,
      providerId: user.providerId,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
    });
    console.log(newUserDoc);
  } catch (error) {
    console.log(error);
  }
}

export function getUserProfile(uid) {
  return doc(db, "users", uid);
}

export async function updateUserLocation(location) {
  const user = auth.currentUser;
  const userDoc = doc(db, "users", user.uid);

  try {
    await updateDoc(userDoc, {
      ...location,
    });
  } catch (error) {
    throw error;
  }
}
export async function updateDisplayName(displayName) {
  const user = auth.currentUser;
  const userDoc = doc(db, "users", user.uid);

  try {
    await updateDoc(userDoc, {
      ...displayName,
    });
  } catch (error) {
    throw error;
  }
}

export function getUserListings(userId) {
  const listings = collection(db, "listings");

  return query(listings, where("lister.uid", "==", userId));
}
//Firebase storage does not allow to delete folders at their path, you must list all files at that reference, loop through them calling, deleteObj upon them.
export async function deleteListing(listingId) {
  const storage = getStorage();
  const storageRef = ref(storage, `/listingPhotos/${listingId}/`);
  const fileRefs = await listAll(storageRef);
  console.log(fileRefs);
  try {
    await deleteDoc(doc(db, "listings", listingId));
    fileRefs.items.forEach(async (ref) => {
      await deleteObject(ref);
    });
  } catch (error) {
    throw error;
  }
}

export async function updateListing(id, values) {
  const docRef = doc(db, "listings", id);

  try {
    const res = await updateDoc(docRef, values);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = auth.currentUser;
  const userDocRef = doc(db, "users", user.uid);
  const userListingsQuery = query(
    collection(db, "listings"),
    where("lister.uid", "==", user.uid)
  );
  console.log(userListingsQuery);
  const batch = writeBatch(db);
  try {
    batch.update(userDocRef, {photoURL: downloadURL});

    const listingsQuerySnap = await getDocs(userListingsQuery);
    for (let i = 0; i < listingsQuerySnap.docs.length; i++) {
      batch.update(listingsQuerySnap.docs[i].ref, {
        "lister.photoURL": downloadURL,
      });
    }

    batch.commit().then(() => updateAuthProfilePhoto(user, downloadURL));
  } catch (error) {
    throw error;
  }
}

export async function listingSubmitWithPhotos(files, values) {
  const user = auth.currentUser;
  const listingId = cuid();

  const promises = files.map((file) => {
    return uploadListingPhotos(file, file.name, listingId).then((ref) =>
      firebaseDownloadURL(ref.metadata.fullPath)
    );
  });
  if (promises) {
    return Promise.all(promises).then((downloadURLs) => {
      setDoc(doc(db, "listings", listingId), {
        title: values.title,
        listDetails: values.listDetails,
        tradeDetails: values.tradeDetails,
        availStart: values.availStart,
        availEnd: values.availEnd,
        location: {
          address: values.location.address,
          latLng: values.location.latLng,
        },
        pictures: downloadURLs,
        lister: {
          displayName: user.displayName,
          uid: user.uid,
          photoURL:
            user.photoURL ||
            "https://ballstatepbs.org/wp-content/uploads/2019/07/generic-female-profile-picture-8.jpg",
        },
        created_at: serverTimestamp(),
      });
    });
  } else {
    throw new Error("Photos Unable To Upload");
  }
}
// 6a3c026ca8e9
