import {Form, Formik} from "formik";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Button} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import {closeModal} from "../../app/common/modals/modalReducer";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {signInUser} from "./authActions";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const {authenticated} = useSelector((state) => state.auth);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  function handleSubmit(e) {
    dispatch(signInUser(e));
    dispatch(closeModal());
  }

  return (
    <ModalWrapper>
      <Formik onSubmit={(e) => handleSubmit(e)} initialValues={initialValues}>
        {({isValid, isSubmitting, dirty}) => (
          <Form className='ui form'>
            <MyTextInput name='email' placeholder='Email' />
            <MyTextInput name='password' placeholder='Password' />
            <MyTextInput
              name='passwordConfirm'
              placeholder='Confirm Password'
            />
            <Button
              type='submit'
              color='teal'
              disabled={!isValid || !dirty || isSubmitting}
              size='large'
              content='Submit'
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
