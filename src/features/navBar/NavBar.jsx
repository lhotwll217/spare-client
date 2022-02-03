import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {Button, Container, Menu, MenuItem} from "semantic-ui-react";
import {openModal} from "../../app/common/modals/modalReducer";
import {signOutUser} from "../auth/authActions";

export default function NavBar() {
  const {authenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Menu fixed='top'>
      <Container>
        <MenuItem as={Link} to='/' header style={{padding: "10px"}}>
          <img src='/assets/spare_icon.png' alt='Spare Logo' />
          <h3 style={{margin: "0", height: "auto"}}>Spare</h3>
        </MenuItem>
        <MenuItem as={NavLink} to='sandbox' name='sandbox' />
        {authenticated && (
          <MenuItem as={NavLink} to='listform' name='Create Listing' />
        )}

        <MenuItem position='right'>
          {authenticated ? (
            <Button
              onClick={() => dispatch(signOutUser())}
              basic
              content='Sign Out'
              style={{marginLeft: "0.5em"}}
            />
          ) : (
            <Button
              basic
              content='Login'
              onClick={() =>
                dispatch(
                  openModal({
                    modalType: "LoginForm",
                  })
                )
              }
            />
          )}
        </MenuItem>
      </Container>
    </Menu>
  );
}
