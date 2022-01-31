import {Formik} from "formik";
import {
  Grid,
  Form,
  FormField,
  GridColumn,
  Segment,
  Button,
} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";

export default function ListFormPage() {
  console.log("listpage");
  const initialValues = {
    title: "",
    listDetails: "",
    tradeDetails: "",
    availStart: "",
    availEnd: "",
  };

  return (
    <Grid centered>
      <GridColumn width={12}>
        <Segment style={{marginTop: "200px"}} clearing>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => console.log(values)}
            handleSubmit={(e) => console.log(e)}
          >
            {({values, isValid, dirty, isSubmitting}) => (
              <Form>
                <FormField>
                  <input
                    type='text'
                    name='title'
                    placeholder='Name'
                    value={values.title}
                  />
                </FormField>
                <MyTextInput
                  placeholder='Details of listing'
                  name='listDetail'
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
