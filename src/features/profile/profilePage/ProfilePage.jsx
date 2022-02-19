import {useState} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {
  Button,
  Grid,
  GridColumn,
  Image,
  Label,
  Progress,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import {
  getUserListings,
  getUserProfile,
} from "../../../app/firebase/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {listenToCurrentUserProfile} from "../profileActions";
import DisplayNameForm from "./DisplayNameForm";
import LocationForm from "./LocationForm";

export default function ProfilePage() {
  const [editName, setEditName] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const dispatch = useDispatch();
  const {currentUserProfile} = useSelector((state) => state.profile);
  const {loading} = useSelector((state) => state.async);
  console.log(editLocation);
  let {userId} = useParams();

  useFirestoreDoc({
    query: () => getUserProfile(userId),
    data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch, userId],
  });

  useFirestoreCollection({
    query: () => getUserListings(),
    data: (listings) => console.log(listings),
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
        />{" "}
        <SegmentGroup style={{backgroundColor: "white"}}>
          <Segment loading={loading}>Profile</Segment>
          <SegmentGroup>
            {" "}
            <Segment>
              <Label content='Display Name' />
              {editName ? (
                <>
                  <div>
                    {" "}
                    <DisplayNameForm setEditName={setEditName} />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <h3>{currentUserProfile.displayName}</h3>
                  <Button
                    content='Edit'
                    size='small'
                    color='teal'
                    onClick={() => setEditName(true)}
                  />
                </>
              )}
            </Segment>
            <Segment>
              <Label content='Location' />
              {currentUserProfile.location?.latLng && !editLocation ? (
                <div>
                  {" "}
                  <h3>{currentUserProfile.location.address}</h3>
                  <Button
                    content='Edit'
                    size='small'
                    color='teal'
                    onClick={() => setEditLocation(true)}
                  />
                </div>
              ) : (
                <LocationForm
                  profile={currentUserProfile}
                  setEditLocation={setEditLocation}
                />
              )}
            </Segment>
          </SegmentGroup>

          <Segment></Segment>
        </SegmentGroup>
      </GridColumn>
    </Grid>
  );
}
