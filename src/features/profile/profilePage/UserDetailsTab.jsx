import {useState} from "react";
import {
  Button,
  Feed,
  Grid,
  GridColumn,
  Header,
  HeaderSubheader,
  Image,
  Label,
  Progress,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import DisplayNameForm from "./DisplayNameForm";
import LocationForm from "./LocationForm";

export default function UserDetailsTab({currentUserProfile}) {
  const [editName, setEditName] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  return (
    <SegmentGroup>
      {" "}
      <Segment>
        <Header as='h3' content='Display Name' />
        {editName ? (
          <>
            <DisplayNameForm setEditName={setEditName} />
          </>
        ) : (
          <>
            <h3 style={{margin: 0, marginBottom: 10}}>
              {currentUserProfile.displayName}
            </h3>
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
        <Header as='h3' content='Location' />
        {currentUserProfile.location?.latLng && !editLocation ? (
          <div>
            {" "}
            <h3 style={{marginTop: 0, marginBottom: 10}}>
              {currentUserProfile.location.address}
            </h3>
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
  );
}
