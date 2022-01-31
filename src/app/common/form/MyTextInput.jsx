import {useField} from "formik";
import {FormField, Label} from "semantic-ui-react";

export default function MyTextInput(label, ...props) {
  const [field, meta] = useField();

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
