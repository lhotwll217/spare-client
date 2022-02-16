import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {
  Button,
  Grid,
  GridColumn,
  Image,
  Input,
  Label,
  Progress,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import {getUserProfile} from "../../../app/firebase/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {listenToCurrentUserProfile} from "../profileActions";
import LocationForm from "./LocationForm";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const {currentUserProfile} = useSelector((state) => state.profile);
  const {loading} = useSelector((state) => state.async);

  let {userId} = useParams();

  console.log(userId);

  useFirestoreDoc({
    query: () => getUserProfile(userId),
    data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch, userId],
  });

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
          color='green'
          content='Upload Photo'
          size='tiny'
          fluid
        />
        <SegmentGroup>
          {" "}
          <Segment>Profile</Segment>
          <SegmentGroup>
            {" "}
            <Segment>
              <Label content='Display Name' />
              <h3>{currentUserProfile.displayName}</h3>
            </Segment>
            <Segment>
              <Label content='Location' />
              {currentUserProfile.location ? (
                <div>{currentUserProfile.location.address}</div>
              ) : (
                <LocationForm />
              )}
            </Segment>
          </SegmentGroup>
          <Segment>Bottom</Segment>
        </SegmentGroup>
      </GridColumn>
    </Grid>
  );
}
