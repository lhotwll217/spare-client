import {useDispatch, useSelector} from "react-redux";
import {
  Link,
  NavLink,
  unstable_HistoryRouter,
  useNavigate,
} from "react-router-dom";
import {Button, Container, Menu, MenuItem} from "semantic-ui-react";
import {openModal} from "../../app/common/modals/modalReducer";
import {signOutFirebase} from "../../app/firebase/firebaseService";
import {signOutUser} from "../auth/authActions";
import {useHistory} from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const {authenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Menu fixed='top'>
      <Container>
        <MenuItem as={Link} to='/' header style={{padding: "10px"}}>
          <img src='/assets/spare_icon.png' alt='Spare Logo' />
          <h3 style={{margin: "0", height: "auto"}}>Spare</h3>
        </MenuItem>
        {/* <MenuItem as={NavLink} to='sandbox' name='sandbox' /> */}
        {authenticated && (
          <MenuItem as={NavLink} to='listform' name='Create Listing' />
        )}

        <MenuItem position='right'>
          {authenticated ? (
            <Button
              onClick={async () => {
                try {
                  await signOutFirebase().then(() => {
                    dispatch(signOutUser());
                    navigate("/");
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
              basic
              content='Sign Out'
              style={{marginLeft: "0.5em"}}
            />
          ) : (
            <>
              <Button
                basic
                size='tiny'
                content='Login'
                onClick={() =>
                  dispatch(
                    openModal({
                      modalType: "LoginForm",
                    })
                  )
                }
              />
              <Button
                size='tiny'
                basic
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
        </MenuItem>
      </Container>
    </Menu>
  );
}
