import {Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {Button, Label} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import {closeModal} from "../../app/common/modals/modalReducer";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {registerWithEmail} from "../../app/firebase/firebaseService";

export default function SignUpForm() {
  const dispatch = useDispatch();

  const initialValues = {
    displayName: "",
    email: "",
    password: "",
  };

  return (
    <ModalWrapper header='Register'>
      <Formik
        onSubmit={async (values, {setSubmitting, setErrors}) => {
          try {
            await registerWithEmail(values);
            setSubmitting(false);
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
            <MyTextInput name='displayName' placeholder='Name' />
            <MyTextInput name='email' placeholder='Email' />
            <MyTextInput
              type='password'
              name='password'
              placeholder='Password'
            />
            {errors.auth && (
              <div style={{marginBottom: "10px"}}>
                <Label basic color='red' content={errors.auth} />
              </div>
            )}

            <Button
              loading={isSubmitting}
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
