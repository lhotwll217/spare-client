import {
  collection,
  addDoc,
  getFirestore,
  query,
  getDocs,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {app} from "../config/firebaseConfig";
const auth = getAuth(app);
const db = getFirestore(app);

//Firestore Data Shaper
export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
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
        photoURL: user.photoURL || "null",
      },
    });
    return docRef;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getListingsFromFirestore(observer) {
  const q = query(collection(db, "listings"));

  return onSnapshot(q, observer);
}
