import MyTextInput from "../../../app/common/form/MyTextInput";
import {Form, Formik} from "formik";
import {Button} from "semantic-ui-react";

export default function DisplayNameForm() {
  const initialValues = {
    displayName: "",
  };
  return (
    <Formik initialValues={initialValues} onSubmit={(e) => console.log(e)}>
      {({values, isValid, isSubmitting, dirty, errors, handleSubmit}) => (
        <Form
          onSubmit={handleSubmit}
          style={{marginTop: 7}}
          className='ui form'
        >
          <MyTextInput name='displayName' />
          <Button
            disabled={!dirty || !isValid || isSubmitting}
            type='submit'
            content='Submit'
            color='teal'
          />
        </Form>
      )}
    </Formik>
  );
}
