import {Formik} from "formik";
import {
  Grid,
  Form,
  FormField,
  GridColumn,
  Segment,
  Button,
  Header,
} from "semantic-ui-react";
import MyDateInput from "../../app/common/form/MyDatePicker";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";

export default function ListFormPage() {
  console.log("listpage");
  const initialValues = {
    title: "",
    listDetails: "",
    tradeDetails: "",
    availStart: "",
    availEnd: "",
    listLatLng: "",
  };

  return (
    <Grid centered>
      <GridColumn width={12}>
        <Segment style={{marginTop: "50px"}} clearing>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => console.log(values)}
            enableReinitialize
          >
            {({values, isValid, dirty, isSubmitting}) => (
              <Form>
                <Header content='List Form' />
                <MyTextInput placeholder='Title' name='title' />
                <MyTextArea
                  rows={3}
                  placeholder='Details of listing'
                  name='listDetail'
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
                <Button type='submit' content='Submit' />
              </Form>
            )}
          </Formik>
        </Segment>
      </GridColumn>
    </Grid>
  );
}
