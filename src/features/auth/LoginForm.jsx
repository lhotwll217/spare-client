import {Form, Formik} from "formik";
import {Button} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {signInUser} from "./authActions";

export default function LoginForm() {
  const dispatch = useDispatch();
  return (
    <ModalWrapper>
      <Formik
        initialValues={{email: "", password: ""}}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={(e) => dispatch(signInUser(e))}
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
