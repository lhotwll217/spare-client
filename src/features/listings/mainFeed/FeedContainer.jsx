import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Feed, Grid, Segment} from "semantic-ui-react";
import {openModal} from "../../../app/common/modals/modalReducer";
import {getListingsFromFirestore} from "../../../app/firebase/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import {listenToListings} from "../listingsActions";
import MyMapContainer from "../map/MyMapContainer";
import FeedItem from "./FeedItem";

export default function FeedContainer() {
  const {listings} = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.async);
  const {currentUserProfile} = useSelector((state) => state.profile);

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
      <MyMapContainer
        latLng={currentUserProfile.location.latLng}
        listings={listings}
      />
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
