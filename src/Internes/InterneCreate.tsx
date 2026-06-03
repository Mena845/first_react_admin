import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  required,
  minValue,
  email,
  ReferenceInput,
  DateInput,
  BooleanInput,
} from "react-admin";
import { SalaryInput  } from "./Componenst/SalaryInput";
import { MentorInput } from "./Componenst/MentorInput";




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
      <ReferenceInput
    source="department"
    reference="Departments"
    label="Département"
>
    <SelectInput
        optionText="name"
        validate={required()}
    />
</ReferenceInput>

      <MentorInput />
      <BooleanInput source="paid" label="Payé" validate={required()}/>
      <SalaryInput />
      <DateInput
      source="enterDate" label="Date d'Entrée"/>
    </SimpleForm>
  </Create>
);
