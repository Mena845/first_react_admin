import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  ReferenceField,
} from "react-admin";
import { employeesFilters } from "../Componenst/employeesFilters";



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
