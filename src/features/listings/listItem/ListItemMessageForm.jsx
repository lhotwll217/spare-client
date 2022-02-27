import {Form, Formik} from "formik";
import {Button, Segment} from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import {addEventMessage} from "../../../app/firebase/firebaseService";

export default function ListItemMessageForm({item, setMessage}) {
  const initialValues = {
    message: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, {setSubmitting}) => {
        try {
          await addEventMessage(item.lister.uid, item.id, item.title, values);
          setSubmitting(false);
          setMessage(false);
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
          <Button
            content='Cancel'
            color='red'
            onClick={() => setMessage(false)}
          />
        </Form>
      )}
    </Formik>
  );
}
