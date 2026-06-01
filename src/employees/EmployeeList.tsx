import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  SearchInput,
  SelectInput,
  ReferenceField,
} from "react-admin";

const EmployeeFilter = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="isPermanent"
    choices={[
      { id: "Informatiquq", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
    ]}
  />,
];

export const EmployeeList = () => (
  <List filters={EmployeeFilter} perPage={5}>
    <Datagrid rowClick="show">
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <TextField source="email" label="Email" />
        <ReferenceField source="department" reference="Departments">
        <TextField source="name" />
      </ReferenceField>
    
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="active" label="Actif" />
    </Datagrid>
  </List>
);
