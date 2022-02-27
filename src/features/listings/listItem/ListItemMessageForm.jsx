import {Form, Formik} from "formik";
import {Button, Segment} from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default function ListItemMessageForm() {
  const initialValues = {
    message: "",
  };
  console.log("render?");
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({isValid, isSubmitting, dirty, errors, handleSubmit}) => (
        <Form onSubmit={handleSubmit} className='ui form'>
          <MyTextArea name='message' rows={2} />

          <Button
            disabled={!dirty || !isValid || isSubmitting}
            type='submit'
            content='Submit'
            color='teal'
            loading={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}
