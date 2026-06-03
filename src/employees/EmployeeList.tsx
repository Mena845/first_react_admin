import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  ReferenceField,
  DataTable,
} from "react-admin";
import { employeesFilters } from "../Componenst/employeesFilters";
import { QuickStatusToggle } from "../Componenst/QuickStatusToggle";


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
    <DataTable.Col label="Action">
    <QuickStatusToggle />
</DataTable.Col>
    <EditButton />
    <DeleteButton />
  </List>
);
