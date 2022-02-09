import {collection, onSnapshot, getFirestore} from "firebase/firestore";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {dataFromSnapshot} from "../firebase/firestoreService";
import {app} from "../config/firebaseConfig";
const db = getFirestore(app);
export default function useFirestoreCollection({query, data, deps}) {
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "listings"), (snapshot) => {
      const listings = snapshot.docs.map((docSnapshot) =>
        dataFromSnapshot(docSnapshot)
      );
      data(listings);
    });
    return () => {
      unsubscribe();
    };
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps
}
