import {Form, Formik} from "formik";
import {Button} from "semantic-ui-react";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import {updateUserLocation} from "../../../app/firebase/firestoreService";
export default function LocationForm({setEditLocation, profile}) {
  const initialValues = {
    location: {address: "", latLng: ""},
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          await updateUserLocation(values).then(() => setEditLocation(false));
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
          <MyPlaceInput placeholder='Location...' name='location' />
          <Button
            disabled={!dirty || !isValid || isSubmitting}
            type='submit'
            content='Submit'
            color='teal'
            loading={isSubmitting}
          />
          {profile.location?.address && (
            <Button
              type='button'
              content='Cancel'
              onClick={() => setEditLocation(false)}
            />
          )}
        </Form>
      )}
    </Formik>
  );
}
