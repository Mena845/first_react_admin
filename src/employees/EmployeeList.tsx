import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  SearchInput,
  SelectInput,
  ReferenceField,
} from "react-admin";

const EmployeeFilter = [
  <SearchInput source="q" alwaysOn key="search" />,
  <SelectInput
    source="department"
    choices={[
      { id: "1", name: "Informatique" },
      { id: "2", name: "Marketing" },
      { id: "3", name: "RH" },
    ]}
    key="department"
  />,
];

export const EmployeeList = () => (
  <List filters={EmployeeFilter} perPage={5}>
    <Datagrid rowClick="show">
      <TextField source="firstName" label="First Name" />
      <TextField source="lastName" label="Last Name" />
      <TextField source="email" label="Email" />
      <ReferenceField source="department" reference="Departments">
        <TextField source="name" />
      </ReferenceField>
      <NumberField
        source="salary"
        label="Salary"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="isActive" label="Active" />
    </Datagrid>
  </List>
);
