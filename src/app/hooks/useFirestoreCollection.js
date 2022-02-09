import {onSnapshot} from "firebase/firestore";
import {useEffect} from "react";

import {dataFromSnapshot} from "../firebase/firestoreService";

export default function useFirestoreCollection({query, data, deps}) {
  useEffect(() => {
    const unsubscribe = onSnapshot(query(), (snapshot) => {
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
