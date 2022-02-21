import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {
  Button,
  Grid,
  GridColumn,
  Header,
  Image,
  Progress,
  Segment,
  SegmentGroup,
  Tab,
  TabPane,
} from "semantic-ui-react";
import {
  getUserListings,
  getUserProfile,
} from "../../../app/firebase/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  listenToCurrentUserProfile,
  listenToProfileListings,
} from "../profileActions";

import UserDetailsTab from "./UserDetailsTab";
import UserListingsTab from "./UserListingsTab";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const {currentUserProfile} = useSelector((state) => state.profile);
  const {loading} = useSelector((state) => state.async);
  const {listings} = useSelector((state) => state.profile);
  console.log(listings);
  let {userId} = useParams();

  useFirestoreDoc({
    query: () => getUserProfile(userId),
    data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch, userId],
  });

  useFirestoreCollection({
    query: () => getUserListings(userId),
    data: (listings) => dispatch(listenToProfileListings(listings)),
    deps: [dispatch, userId],
  });

  const panes = [
    {
      menuItem: "User Details",
      render: () => (
        <TabPane>
          <UserDetailsTab currentUserProfile={currentUserProfile} />
        </TabPane>
      ),
    },
    {
      menuItem: "Listings",
      render: () => (
        <TabPane>
          <UserListingsTab listings={listings} />
        </TabPane>
      ),
    },
  ];

  if (loading || !currentUserProfile) {
    return <Progress loading={loading.toString()} />;
  }
  return (
    <Grid style={{marginTop: "30px"}} centered>
      <GridColumn width={12}>
        <Image
          src='https://ballstatepbs.org/wp-content/uploads/2019/07/generic-female-profile-picture-8.jpg'
          circular
          bordered
          centered
        />
        <Button
          style={{margin: "auto", padding: 5, borderRadius: 2, maxWidth: 100}}
          color='teal'
          content='Upload Photo'
          size='tiny'
          fluid
        />{" "}
        <Tab panes={panes} style={{marginTop: 12}} />
      </GridColumn>
    </Grid>
  );
}
