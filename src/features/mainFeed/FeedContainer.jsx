import {useEffect, useState} from "react";
import {Feed, Grid} from "semantic-ui-react";
import {
  getListings,
  getListingsFromFirestore,
  dataFromSnapshot,
} from "../../app/firebase/firestoreService";
import FeedItem from "./FeedItem";

export default function FeedContainer() {
  useEffect(() => {
    const unsubscribe = getListingsFromFirestore({
      next: (snapshot) =>
        console.log(
          snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
        ),
      error: (error) => console.log(error),
    });
    return unsubscribe;
  });
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
