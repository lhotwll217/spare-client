import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {Button, Container, Menu, MenuItem} from "semantic-ui-react";
import {openModal} from "../../app/common/modals/modalReducer";
import {signOutFirebase} from "../../app/firebase/firebaseService";
import {signOutUser} from "../auth/authActions";
import {profileLogOut} from "../profile/profileActions";
import ChatDropdown from "./ChatDropdown";
import SignedInMenu from "./SignedInMenu";

export default function NavBar() {
  const navigate = useNavigate();

  const {authenticated, currentUser} = useSelector((state) => state.auth);
  // const {authenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Menu fixed='top'>
      <Container>
        <MenuItem as={Link} to='/' header style={{padding: "5px"}}>
          <img src='/assets/spare_logo.png' alt='Spare Logo' />
          <h3 style={{margin: "0", marginLeft: "5px", height: "auto"}}>
            Spare
          </h3>
        </MenuItem>
        <div style={{display: "flex", width: "100%"}} />
        {authenticated && (
          <MenuItem position='right'>
            <ChatDropdown />
          </MenuItem>
        )}

        {authenticated ? (
          <SignedInMenu currentUser={currentUser} />
        ) : (
          <>
            <MenuItem
              position='right'
              content='Login'
              onClick={() =>
                dispatch(
                  openModal({
                    modalType: "LoginForm",
                  })
                )
              }
            />
            <MenuItem
              content='Sign Up'
              onClick={() =>
                dispatch(
                  openModal({
                    modalType: "SignUpForm",
                  })
                )
              }
            />
          </>
        )}
      </Container>
    </Menu>
  );
}
