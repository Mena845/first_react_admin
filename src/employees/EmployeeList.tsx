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
  TextInput,
  ReferenceInput,
} from "react-admin";


const employeesFilters = [
    <TextInput label="search" source="q" alwaysOn/>,
    <ReferenceInput source="department" reference="Departments" label="Departments">
           <SelectInput optionText="name"/>
    </ReferenceInput>,
    <SelectInput source="active" label="Actif" choices={[
        { id: true, name: 'Yes' },
        { id: false, name: 'No' },
    ]} />
];

export const EmployeeList = () => (
  <List filters={employeesFilters} perPage={5}>
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
      <BooleanField source="isActive" label="Actif" />
    </Datagrid>
    <EditButton />
    <DeleteButton />
  </List>
);
