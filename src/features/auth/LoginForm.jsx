import {Form, Formik} from "formik";
import {Button} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";

export default function LoginForm() {
  return (
    <ModalWrapper>
      <Formik
        initialValues={{email: "", password: ""}}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={(e) => console.log(e)}
      >
        {({isSubmitting, isValid, dirty}) => (
          <Form className='ui form'>
            <MyTextInput name='email' placeholder='Email' />
            <MyTextInput name='password' placeholder='Password' />
            <Button
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
