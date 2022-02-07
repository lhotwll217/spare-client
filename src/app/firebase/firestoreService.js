import {collection, addDoc, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {app} from "../config/firebaseConfig";
const auth = getAuth(app);
const db = getFirestore(app);
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
