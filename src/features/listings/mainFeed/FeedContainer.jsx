import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Feed, Grid} from "semantic-ui-react";
import {
  getListings,
  getListingsFromFirestore,
  dataFromSnapshot,
} from "../../../app/firebase/firestoreService";
import {listenToListings} from "../listingsActions";
import FeedItem from "./FeedItem";

export default function FeedContainer() {
  const {listings} = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  console.log(listings);
  //Listen to data
  useEffect(() => {
    const unsubscribe = getListingsFromFirestore({
      next: (snapshot) =>
        dispatch(
          listenToListings(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        )(),
      error: (error) => console.log(error),
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <Grid centered>
      <Grid.Column width={10}>
        <Feed>
          <FeedItem />
          <FeedItem />
          <FeedItem />
          <FeedItem />
          <FeedItem />
        </Feed>
      </Grid.Column>
    </Grid>
  );
}
