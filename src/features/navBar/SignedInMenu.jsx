import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";
import {signOutFirebase} from "../../app/firebase/firebaseService";

import {signOutUser} from "../auth/authActions";
import {profileLogOut} from "../profile/profileActions";

export default function SignedInMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUserProfile} = useSelector((state) => state.profile);

  async function handleSignOut() {
    try {
      await signOutFirebase().then(() => {
        dispatch(signOutUser());
        dispatch(profileLogOut());
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MenuItem position='right' style={{marginLeft: "0px 0px 0px 0px"}}>
      <Image
        avatar
        spaced='right'
        src={
          currentUserProfile?.photoURL ||
          "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
        }
      />
      <Dropdown pointing='top right' text={currentUserProfile?.displayName}>
        <DropdownMenu>
          <DropdownItem
            as={Link}
            to='/listform'
            text='Create Listing'
            icon='plus'
          />
          <DropdownItem text='My Account' icon='settings' />
          <DropdownItem
            text='My Profile'
            icon='user'
            as={Link}
            to={`/profile`}
          />
          <DropdownItem onClick={handleSignOut} text='Sign out' icon='plus' />
        </DropdownMenu>
      </Dropdown>
    </MenuItem>
  );
}
