import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  required,
  minValue,
  email,
  ReferenceInput,
  DateInput,
} from "react-admin";

export const InternCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="firstName" label="First Name" validate={required()} />
      <TextInput source="lastName" label="Last Name" validate={required()} />
      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
      />
      <ReferenceInput source="mentorId" reference="Employees" label="Mentor">
        <SelectInput optionText="firstName" validate={required()} />
      </ReferenceInput>
      <BooleanInput source="paid" label="Paid" validate={required()} />
      <NumberInput
        source="salary"
        label="Salary"
        validate={[required(), minValue(0)]}
      />
      <DateInput source="enterDate" label="Entry Date" />
    </SimpleForm>
  </Create>
);
