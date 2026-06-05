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

const EmployeeShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const EmployeeShow = () => (
  <Show actions={<EmployeeShowActions />}>
    <SimpleShowLayout>
      <TextField source="firstName" label="First Name" />
      <TextField source="lastName" label="Last Name" />
      <EmailField source="email" label="Email" />
      <ReferenceField source="department" reference="Departments">
        <TextField source="name" />
      </ReferenceField>
      <NumberField
        source="salary"
        label="Salary"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="isActive" label="Active" />
      <EditButton />
    </SimpleShowLayout>
  </Show>
);
