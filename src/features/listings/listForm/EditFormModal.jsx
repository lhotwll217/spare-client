import {Formik} from "formik";
import * as Yup from "yup";
import {
  Grid,
  Form,
  GridColumn,
  Segment,
  Button,
  Header,
  Label,
} from "semantic-ui-react";
import MyDateInput from "../../../app/common/form/MyDatePicker";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import {useSelector} from "react-redux";
import {addListing} from "../../../app/firebase/firestoreService";
import {useNavigate} from "react-router-dom";
import ModalWrapper from "../../../app/common/modals/ModalWrapper";

export default function EditFormModal() {
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    listDetails: "",
    tradeDetails: "",
    availStart: "",
    availEnd: "",
    location: {address: "", latLng: ""},
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    listDetails: Yup.string().required("Required"),
    tradeDetails: Yup.string().required("Required"),
    availStart: Yup.string().required("Required"),
    availEnd: Yup.string().required("Required"),
    location: Yup.object().shape({
      address: Yup.string().required("Required"),
    }),
  });
  return (
    <ModalWrapper width='70%'>
      <Grid centered>
        <GridColumn width={12}>
          <Segment style={{marginTop: "50px"}} clearing>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, {setErrors, setSubmitting}) => {
                try {
                  const docRef = await addListing(values);
                  console.log(docRef);
                  setSubmitting(false);
                  navigate("/");
                } catch (error) {
                  setErrors({firestore: error.message});
                }
              }}
              enableReinitialize
              validationSchema={validationSchema}
            >
              {({
                values,
                isValid,
                dirty,
                isSubmitting,
                errors,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Header content='List Form' />
                  <MyTextInput placeholder='Title' name='title' />
                  <MyTextArea
                    rows={3}
                    placeholder='Details of listing'
                    name='listDetails'
                  />
                  <MyTextArea
                    rows={3}
                    placeholder='Trade for...'
                    name='tradeDetails'
                  />

                  <MyDateInput
                    type='date'
                    name='availStart'
                    placeholderText='Availability start...'
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy '
                    autoComplete='off'
                  />
                  <MyDateInput
                    name='availEnd'
                    placeholderText='Availability end...'
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy'
                    autoComplete='off'
                  />
                  <MyPlaceInput placeholder='Location...' name='location' />
                  {errors.firestore && (
                    <div style={{marginBottom: "10px"}}>
                      <Label basic color='red' content={errors.firestore} />
                    </div>
                  )}
                  <Button
                    disabled={!dirty || !isValid || isSubmitting}
                    type='submit'
                    content='Submit'
                    color='teal'
                  />
                </Form>
              )}
            </Formik>
          </Segment>
        </GridColumn>
      </Grid>
    </ModalWrapper>
  );
}
