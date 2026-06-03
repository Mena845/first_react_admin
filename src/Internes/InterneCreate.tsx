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
import { useWatch } from "react-hook-form";
const SalaryInput = () => {
  const paid = useWatch({
    name: "paid",
  });
  if(!paid) return null;
  return (
    <NumberInput source="salary" label="Salaire" validate={[required(), minValue(0)]} />
  );
}

const MentorInput = () => {
    const department = useWatch({
        name: "department",
    });

    return (
        <ReferenceInput
            source="mentorId"
            reference="Employees"
            filter={{
                department,
                isActive: true,
            }}
        >
            <SelectInput
                optionText={(record) =>
                    `${record.firstName} ${record.lastName}`
                }
                validate={required()}
            />
        </ReferenceInput>
    );
};

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
