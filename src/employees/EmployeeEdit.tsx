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
import { EmployeeTitle } from "../Components/EmployeeTitle";


export const EmployeeEdit = () => (
  <Edit title={<EmployeeTitle />}>
    <SimpleForm sx={{ "& .RaInput-root": { maxWidth: 500 } }}>
      <TextInput source="firstName" label="Prénom" validate={required()} />
      <TextInput source="lastName" label="Nom" validate={required()} />
      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
      />
      <ReferenceInput
        source="department"
        reference="Departments"
        label="Département"
      >
        <SelectInput optionText="name" validate={required()} />
      </ReferenceInput>
      <NumberInput
        source="salary"
        label="Salaire (€)"
        validate={[required(), minValue(1500, "Minimum 1500 €")]}
      />
      <BooleanInput source="isActive" label="Actif" />
    </SimpleForm>
  </Edit>
);
