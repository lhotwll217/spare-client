import {onSnapshot} from "firebase/firestore";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../async/asyncReducer";
import {dataFromSnapshot} from "../firebase/firestoreService";

export default function useFirestoreCollection({query, data, deps}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = onSnapshot(
      query(),
      (snapshot) => {
        const listings = snapshot.docs.map((docSnapshot) =>
          dataFromSnapshot(docSnapshot)
        );
        data(listings);
        dispatch(asyncActionFinish());
      },
      (error) => {
        dispatch(asyncActionError(error));
        dispatch(asyncActionFinish());
      }
    );

    return () => {
      unsubscribe();
    };
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps
}
