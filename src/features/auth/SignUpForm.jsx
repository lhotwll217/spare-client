import {Form, Formik} from "formik";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Button} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import {closeModal} from "../../app/common/modals/modalReducer";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {signInEmail} from "../../app/firebase/firebaseService";
import {signInUser} from "./authActions";

export default function SignUpForm() {
  const dispatch = useDispatch();

  const initialValues = {
    displayName: "",
    email: "",
    password: "",
  };

  return (
    <ModalWrapper>
      <Formik
        onSubmit={async (values, {setSubmitting, setErrors}) => {
          try {
            const result = await signInEmail(values);
            setSubmitting(false);
            dispatch(signInUser(result));
          } catch (error) {
            console.log(error);
            setErrors(error.message);
          }
        }}
        initialValues={initialValues}
      >
        {({isValid, isSubmitting, dirty}) => (
          <Form className='ui form'>
            <MyTextInput name='displayName' placeholder='name' />
            <MyTextInput name='email' placeholder='Email' />
            <MyTextInput name='password' placeholder='Password' />
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
