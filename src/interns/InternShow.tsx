import {
  TopToolbar,
  ListButton,
  EditButton,
  TextField,
  EmailField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  BooleanField,
  DateField,
} from "react-admin";
const InternShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const InternShow = () => (
  <Show actions={<InternShowActions />}>
    <SimpleShowLayout>
      <TextField source="firstName" label="First Name" />
      <TextField source="lastName" label="Last Name" />
      <EmailField source="email" label="Email" />
      <ReferenceField source="mentorId" reference="Employees">
        <TextField source="firstName" label="Mentor First Name" />
        <TextField source="lastName" label="Mentor Last Name" />
      </ReferenceField>
      <ReferenceField source="department" reference="Departments">
        <TextField source="name" label="Department" />
      </ReferenceField>
      <BooleanField source="paid" label="Paid" />
      <NumberField
        source="salary"
        label="Salary"
        options={{ style: "currency", currency: "EUR" }}
      />
      <DateField
        source="enterDate"
        label="Entry Date"
        options={{ dateStyle: "short" }}
      />
    </SimpleShowLayout>
  </Show>
);
