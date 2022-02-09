import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Feed, Grid, Segment} from "semantic-ui-react";
import {
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import {
  getListingsFromFirestore,
  dataFromSnapshot,
} from "../../../app/firebase/firestoreService";
import {listenToListings} from "../listingsActions";
import FeedItem from "./FeedItem";

export default function FeedContainer() {
  const {listings} = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.async);

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = getListingsFromFirestore({
      next: (snapshot) =>
        dispatch(
          listenToListings(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        )(),
      error: (error) => console.log(error),
    });
    dispatch(asyncActionFinish());
    return unsubscribe;
  }, [dispatch]);

  return (
    <Grid centered>
      <Grid.Column width={10}>
        <Segment loading={loading}>
          <Feed>
            {listings.map((item) => {
              return <FeedItem key={item.id} item={item} />;
            })}
          </Feed>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
