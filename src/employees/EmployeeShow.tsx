import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  EmailField,
  TopToolbar,
  ListButton,
  EditButton,
  ReferenceField,
} from "react-admin";
import { DepartmentStats } from "../Componenst/DepartmentStats";
import { InternsByManager } from "../Componenst/InternsByManager";

const EmployeeShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const EmployeeShow = () => (
  <Show actions={<EmployeeShowActions />}>
    <SimpleShowLayout>
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <EmailField source="email" label="Email" />
      <ReferenceField source="department" reference="Departments">
        <TextField source="name" />
      </ReferenceField>
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="active" label="Actif" />
            <DepartmentStats />
      <InternsByManager />
         <EditButton />
    </SimpleShowLayout>
  </Show>
);
