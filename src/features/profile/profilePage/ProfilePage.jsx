import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {
  Button,
  Grid,
  GridColumn,
  Image,
  Progress,
  Tab,
  TabPane,
} from "semantic-ui-react";
import {
  getUserListings,
  getUserProfile,
  updateUserProfilePhoto,
} from "../../../app/firebase/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  listenToCurrentUserProfile,
  listenToProfileListings,
} from "../profileActions";

import UserDetailsTab from "./UserDetailsTab";
import UserListingsTab from "./UserListingsTab";
import PhotoDropzone from "../../../app/common/photos/PhotoDropzone";
import {useState} from "react";
import {
  firebaseDownloadURL,
  uploadToFirebaseStorage,
} from "../../../app/firebase/firebaseService";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const {currentUserProfile} = useSelector((state) => state.profile);
  const {loading} = useSelector((state) => state.async);
  const {listings} = useSelector((state) => state.profile);

  let {userId} = useParams();
  const [files, setFiles] = useState(null);
  const [upload, setUpload] = useState(false);
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

  async function handleUploadImage(image) {
    const filename = image.name;
    const uploadRef = await uploadToFirebaseStorage(image, filename);
    const downloadURL = await firebaseDownloadURL(uploadRef.metadata.fullPath);
    await updateUserProfilePhoto(downloadURL);
    console.log(downloadURL);
  }
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
          src={
            files
              ? files[0]?.preview
              : "https://ballstatepbs.org/wp-content/uploads/2019/07/generic-female-profile-picture-8.jpg"
          }
          circular
          bordered
          centered
        />
        {!upload && (
          <Button
            style={{margin: "auto", padding: 5, borderRadius: 2, maxWidth: 100}}
            color='teal'
            content='Upload Photo'
            size='tiny'
            fluid
            onClick={() => setUpload(true)}
          />
        )}

        {upload && (
          <div>
            <PhotoDropzone setFiles={setFiles} />
            <Button
              style={{maxWidth: 100, margin: "auto", padding: 5}}
              content='Cancel'
              onClick={() => {
                setFiles(null);
                setUpload(false);
              }}
              fluid
              size='tiny'
              color='red'
            />
          </div>
        )}
        {upload && files && (
          <Button
            style={{maxWidth: 100, margin: "auto", padding: 5}}
            content='Submit'
            onClick={() => handleUploadImage(files[0])}
            fluid
            size='tiny'
            color='green'
          />
        )}

        <Tab panes={panes} style={{marginTop: 12}} />
      </GridColumn>
    </Grid>
  );
}
