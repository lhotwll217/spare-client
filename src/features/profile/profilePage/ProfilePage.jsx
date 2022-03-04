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
import MyCropper from "../../../app/common/photos/MyCropper";
import cuid from "cuid";
export default function ProfilePage() {
  const dispatch = useDispatch();
  const {currentUserProfile} = useSelector((state) => state.profile);
  const {loading} = useSelector((state) => state.async);
  const {listings} = useSelector((state) => state.profile);
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  let {userId} = useParams();
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  console.log(image);
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
    const filename = cuid();

    try {
      console.log(submitting);
      await image.toBlob(async (blob) => {
        setSubmitting(true);
        const uploadRef = await uploadToFirebaseStorage(blob, filename);
        const downloadURL = await firebaseDownloadURL(
          uploadRef.metadata.fullPath
        );
        await updateUserProfilePhoto(downloadURL);
        setUpload(false);
        setFiles([]);
        setImage(null);

        console.log(downloadURL);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
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
            files.length > 0 && image
              ? image.toDataURL()
              : currentUserProfile.photoURL ||
                "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
          }
          circular
          bordered
          centered
          size='medium'
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
        {upload && !image && <PhotoDropzone setFiles={setFiles} />}
        {upload && (
          <div>
            <Button
              style={{maxWidth: 100, margin: "auto", padding: 5}}
              content='Cancel'
              onClick={() => {
                setFiles([]);
                setUpload(false);
                setImage(null);
              }}
              fluid
              size='tiny'
              color='red'
            />
          </div>
        )}
        {upload && image && (
          <Button
            style={{maxWidth: 100, margin: "auto", padding: 5}}
            content='Submit'
            onClick={() => handleUploadImage(image)}
            fluid
            size='tiny'
            color='green'
            loading={submitting}
          />
        )}
        {files.length > 0 && (
          <MyCropper src={files[0].preview} setImage={setImage} />
        )}

        <Tab panes={panes} style={{marginTop: 12}} />
      </GridColumn>
    </Grid>
  );
}
