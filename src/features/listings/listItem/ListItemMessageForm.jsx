import {Form, Formik} from "formik";
import {Button, Segment} from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import {addEventMessage} from "../../../app/firebase/firebaseService";

export default function ListItemMessageForm({item}) {
  const initialValues = {
    message: "",
  };
  console.log("render?");
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, {setSubmitting}) => {
        try {
          await addEventMessage(item.lister.uid, item.id, item.title, values);
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      }}
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
