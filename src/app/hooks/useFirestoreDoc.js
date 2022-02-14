import {onSnapshot} from "firebase/firestore";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../async/asyncReducer";
import {dataFromSnapshot} from "../firebase/firestoreService";

export default function useFirestoreDoc({query, data, deps}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = onSnapshot(
      query(),
      (snapshot) => {
        data(dataFromSnapshot(snapshot));
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
