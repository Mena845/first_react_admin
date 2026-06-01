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
} from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
];

export const InterneCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="firstName" label="Prénom" validate={required()} />
      <TextInput source="lastName" label="Nom" validate={required()} />
      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
      />
      <BooleanInput source="paid" label="Payé" 
      validate={required()}/>
      <NumberInput
        source="salary"
        label="Salaire"
        validate={[required(), minValue(0)]}
      />
    </SimpleForm>
  </Create>
);
