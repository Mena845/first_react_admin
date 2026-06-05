import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  required,
  minValue,
  email,
  useRecordContext,
  ReferenceInput,
} from "react-admin";

const EmployeeTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span>
      Edit: {record.firstName} {record.lastName}
    </span>
  );
};

export const EmployeeEdit = () => (
  <Edit title={<EmployeeTitle />}>
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
        <SelectInput optionText="name" validate={required()} />
      </ReferenceInput>
      <NumberInput
        source="salary"
        label="Salary (€)"
        validate={[required(), minValue(1500, "Minimum salary is 1500 €")]}
      />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Edit>
);
