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
} from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
];

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
      <SelectInput
        source="department"
        label="Département"
        choices={departmentChoices}
        validate={required()}
      />
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
