import MyTextInput from "../../../app/common/form/MyTextInput";
import {Form, Formik} from "formik";
import {Button} from "semantic-ui-react";
import {updateDisplayName} from "../../../app/firebase/firestoreService";

export default function DisplayNameForm({setEditName}) {
  const initialValues = {
    displayName: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          await updateDisplayName(values).then(() => setEditName(false));
        } catch (error) {
          console.log(error);
        }
      }}
    >
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
          <Button
            type='button'
            content='Cancel'
            onClick={() => setEditName(false)}
          />
        </Form>
      )}
    </Formik>
  );
}
