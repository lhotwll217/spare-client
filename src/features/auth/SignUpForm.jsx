import {Form, Formik} from "formik";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Button, Label} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import {closeModal} from "../../app/common/modals/modalReducer";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {registerWithEmail} from "../../app/firebase/firebaseService";
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
            const result = await registerWithEmail(values);
            setSubmitting(false);
            dispatch(signInUser(result));
            dispatch(closeModal());
          } catch (error) {
            console.log(error);
            setErrors({auth: error.message});
          }
        }}
        initialValues={initialValues}
      >
        {({isValid, isSubmitting, dirty, errors}) => (
          <Form className='ui form'>
            <MyTextInput name='displayName' placeholder='name' />
            <MyTextInput name='email' placeholder='Email' />
            <MyTextInput name='password' placeholder='Password' />
            {errors.auth && (
              <div style={{marginBottom: "10px"}}>
                <Label basic color='red' content={errors.auth} />
              </div>
            )}

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
