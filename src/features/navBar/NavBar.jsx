import {useDispatch} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {Button, Container, Menu, MenuItem} from "semantic-ui-react";
import {openModal} from "../../app/common/modals/modalReducer";

export default function NavBar() {
  const dispatch = useDispatch();
  return (
    <Menu inverted fixed='top'>
      <Container>
        <MenuItem as={Link} to='/' header style={{padding: "10px"}}>
          <img src='/assets/spare_icon.png' alt='Spare Logo' />
          <h3 style={{margin: "0", height: "auto"}}>Spare</h3>
        </MenuItem>
        <MenuItem as={NavLink} to='sandbox' name='sandbox' />
        <MenuItem as={NavLink} to='listform' name='Create Listing' />
        <MenuItem>
          <Button basic inverted content='Profile' />
        </MenuItem>
        <MenuItem position='right'>
          <Button
            basic
            inverted
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
            basic
            inverted
            content='Sign Up'
            style={{marginLeft: "0.5em"}}
          />
        </MenuItem>
      </Container>
    </Menu>
  );
}
