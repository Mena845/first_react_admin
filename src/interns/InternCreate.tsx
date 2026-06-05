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
    <SimpleForm sx={{ "& .RaInput-root": { maxWidth: 500 } }}>
      <TextInput source="firstName" label="Prénom" validate={required()} />
      <TextInput source="lastName" label="Nom" validate={required()} />
      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
      />
      <ReferenceInput source="mentorId" reference="Employees" label="Manager">
        <SelectInput optionText="firstName" validate={required()} />
      </ReferenceInput>
      <BooleanInput source="paid" label="Payé" validate={required()} />
      <NumberInput
        source="salary"
        label="Salaire (€)"
        validate={[required(), minValue(0)]}
      />
      <DateInput source="enterDate" label="Date d'entrée" />
    </SimpleForm>
  </Create>
);
