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
    title: "Title",
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
            {({values, handleChange, handleSubmit}) => (
              <>
                <h1>What</h1>
                <Form onSubmit={handleSubmit}>
                  <FormField>
                    <input
                      onChange={handleChange}
                      type='text'
                      name='title'
                      placeholder='Name'
                      value={values.title}
                    />
                  </FormField>
                  <Button type='submit' content='Submit' />
                </Form>
              </>
            )}
          </Formik>
        </Segment>
      </GridColumn>
    </Grid>
  );
}
