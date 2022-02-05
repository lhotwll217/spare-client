import {Form, Formik} from "formik";
import {Button} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {signInUser} from "./authActions";
import {closeModal} from "../../app/common/modals/modalReducer";

export default function LoginForm() {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    dispatch(signInUser(e));
    dispatch(closeModal());
  }

  return (
    <ModalWrapper>
      <Formik
        initialValues={{email: "", password: ""}}
        validationSchema={Yup.object({
          email: Yup.string().required("Email Required").email(),
          password: Yup.string().required("Provide a password"),
        })}
        onSubmit={(e) => handleSubmit(e)}
      >
        {({isSubmitting, isValid, dirty}) => (
          <Form className='ui form'>
            <MyTextInput name='email' placeholder='Email' />
            <MyTextInput
              type='password'
              name='password'
              placeholder='Password'
            />
            <Button
              style={{margin: "auto"}}
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              size='large'
              color='teal'
              content='Submit'
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
