import {Formik} from "formik";
import * as Yup from "yup";
import {
  Grid,
  Form,
  GridColumn,
  Segment,
  Button,
  Header,
} from "semantic-ui-react";
import MyDateInput from "../../app/common/form/MyDatePicker";
import MyPlaceInput from "../../app/common/form/MyPlaceInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";

export default function ListFormPage() {
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
    <Grid centered>
      <GridColumn width={12}>
        <Segment style={{marginTop: "50px"}} clearing>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => console.log(values)}
            enableReinitialize
            validationSchema={validationSchema}
          >
            {({values, isValid, dirty, isSubmitting, handleSubmit}) => (
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
                <Button type='submit' content='Submit' />
              </Form>
            )}
          </Formik>
        </Segment>
      </GridColumn>
    </Grid>
  );
}
