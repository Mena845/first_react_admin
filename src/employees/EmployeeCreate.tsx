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
      <TextInput source="firstName" label="Prénom" validate={required()} />
      <TextInput source="lastName" label="Nom" validate={required()} />
      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
      />
      <ReferenceInput source="department" reference="Departments" label="Département">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput
  source="salary"
  label="Salaire"
  validate={[required(), minValue(1500, "Le salaire minimum est de 1400 €")]}
/>
      <BooleanInput source="isActive" label="Actif" defaultValue={true} />
    </SimpleForm>
  </Create>
);
