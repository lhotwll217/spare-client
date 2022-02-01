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
            handleSubmit={(e) => console.log(e)}
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
                <Button type='submit' content='Submit' />
              </Form>
            )}
          </Formik>
        </Segment>
      </GridColumn>
    </Grid>
  );
}
