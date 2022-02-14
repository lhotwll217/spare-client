import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {app} from "../config/firebaseConfig";
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
