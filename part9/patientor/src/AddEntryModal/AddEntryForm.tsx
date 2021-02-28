import React from "react";
import { Grid, Button } from "semantic-ui-react";
import * as yup from "yup";

import { Field, Formik, Form } from "formik";

import { useStateValue } from "../state";
import { Entry, EntryTypes } from "../types";

import { TextField, DiagnosisSelection } from "../components/FormField";
import EntryTypeFields from "./EntryTypeFields";

const baseSchema = yup.object().shape({
  description: yup.string().min(12).required(),
  date: yup
    .string()
    .matches(/^\w{4}-\w{2}-\w{2}$/, "Enter date in the format YYYY-MM-DD")
    .required(),
  specialist: yup.string().min(6).required(),
  diagnosisCodes: yup.array().of(yup.string()),
});

const healthCheckSchema = baseSchema.concat(
  yup.object().shape({
    healthCheckRating: yup
      .number()
      .typeError("health check rating must be a number")
      .min(0)
      .max(3)
      .required("Please enter a rating from 0(great) - 3(critical)"),
  }) as any
);

const occupationalHealthCareSchema = baseSchema.concat(
  yup.object().shape({
    employerName: yup.string().min(3).required(),
    sickLeave: yup.object().shape({
      startDate: yup
        .string()
        .matches(/^\w{4}-\w{2}-\w{2}$/, "Enter date in the format YYYY-MM-DD"),
      endDate: yup
        .string()
        .matches(/^\w{4}-\w{2}-\w{2}$/, "Enter date in the format YYYY-MM-DD"),
    }),
  }) as any
);

const hospitalSchema = baseSchema.concat(
  yup.object().shape({
    discharge: yup
      .object({
        date: yup
          .string()
          .matches(/^\w{4}-\w{2}-\w{2}$/, "Enter date in the format YYYY-MM-DD")
          .required("discharge date is a required field"),
        criteria: yup
          .string()
          .min(12)
          .required("discharge criteria is a required field"),
      })
      .required(),
  }) as any
);

function selectSchema(type: EntryTypes) {
  switch (type) {
    case "OccupationalHealthcare":
      return occupationalHealthCareSchema;
    case "Hospital":
      return hospitalSchema;
    case "HealthCheck":
      return healthCheckSchema;
    default:
      return baseSchema;
  }
}

interface Props {
  initialValues: Entry;
  entryType: EntryTypes;
  onSubmit: (values: Entry) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  initialValues,
  entryType,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={selectSchema(entryType)}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <EntryTypeFields entry={values.type} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
