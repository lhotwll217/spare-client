import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Feed, Grid, Segment} from "semantic-ui-react";
import {getListingsFromFirestore} from "../../../app/firebase/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import {listenToListings} from "../listingsActions";
import MyMapContainer from "../map/MyMapContainer";
import FeedItem from "./FeedItem";

export default function FeedContainer() {
  const {listings} = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getListingsFromFirestore(),
    data: (listings) => dispatch(listenToListings(listings)),
    deps: [dispatch],
  });

  return (
    <Grid centered>
      <MyMapContainer listings={listings} />
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
