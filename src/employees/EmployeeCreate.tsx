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
} from "react-admin";

export const EmployeeCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="firstName" label="First Name" validate={required()} />
      <TextInput source="lastName" label="Last Name" validate={required()} />
      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
      />
      <ReferenceInput
        source="department"
        reference="Departments"
        label="Department"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput
        source="salary"
        label="Salary"
        validate={[required(), minValue(0)]}
      />
      <BooleanInput source="isActive" label="Active" defaultValue={true} />
    </SimpleForm>
  </Create>
);
