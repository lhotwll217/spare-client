import {Form, Formik} from "formik";
import {Button, Label} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {signInUser} from "./authActions";
import {closeModal} from "../../app/common/modals/modalReducer";
import {signInWithEmail} from "../../app/firebase/firebaseService";

export default function LoginForm() {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    dispatch(signInUser(e));
    dispatch(closeModal());
  }

  return (
    <ModalWrapper header='Login'>
      <Formik
        initialValues={{email: "", password: ""}}
        validationSchema={Yup.object({
          email: Yup.string().required("Email Required").email(),
          password: Yup.string().required("Provide a password"),
        })}
        onSubmit={async (values, {setErrors, setSubmitting}) => {
          try {
            const user = await signInWithEmail(values);
            dispatch(signInUser(user));
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({auth: error.message});
          }
        }}
      >
        {({isSubmitting, isValid, dirty, errors}) => (
          <Form className='ui form'>
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
