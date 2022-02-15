import {Form, Formik} from "formik";
import {Button} from "semantic-ui-react";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
export default function LocationForm() {
  const initialValues = {
    location: {address: "", latLng: ""},
  };
  return (
    <Formik initialValues={initialValues} onSubmit={(e) => console.log(e)}>
      {({values, isValid, isSubmitting, dirty, errors, handleSubmit}) => (
        <Form style={{marginTop: 7}} className='ui form'>
          <MyPlaceInput placeholder='Location...' name='location' />
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
