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
      Modifier : {record.firstName} {record.lastName}
    </span>
  );
};

export const EmployeeEdit = () => (
  <Edit title={<EmployeeTitle />}>
    <SimpleForm>
      <TextInput source="firstName" label="Prénom" validate={required()} />
      <TextInput source="lastName" label="Nom" validate={required()} />
      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
      />
       <ReferenceInput source="department" reference="Departments" label="Département">
              <SelectInput optionText="name" validate={required()} />
            </ReferenceInput>
      <NumberInput
        source="salary"
        label="Salaire (€)"
        validate={[
          required(),
          minValue(1500, "Le salaire minimum est de 1500 €"),
        ]}
      />
      <BooleanInput source="active" label="Actif" />
    </SimpleForm>
  </Edit>
);
