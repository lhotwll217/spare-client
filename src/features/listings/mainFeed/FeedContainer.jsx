import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Feed, Grid, Segment} from "semantic-ui-react";
import {openModal} from "../../../app/common/modals/modalReducer";
import {getListingsFromFirestore} from "../../../app/firebase/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";

import {listenToListings} from "../listingsActions";

import FeedItem from "./FeedItem";
import FeedMap from "./FeedMap";

export default function FeedContainer() {
  const {listings} = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getListingsFromFirestore(),
    data: (listings) => dispatch(listenToListings(listings)),
    deps: [dispatch],
  });

  if (error) {
    dispatch(
      openModal({
        modalType: "ErrorComponent",
      })
    );
  }
  return (
    <Grid centered>
      <Grid.Column style={{marginTop: "80px", marginBottom: "20px"}} width={10}>
        <FeedMap listings={listings} />
      </Grid.Column>
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
