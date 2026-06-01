import {TopToolbar, ListButton, EditButton, TextField, EmailField, NumberField, ReferenceField, Show, SimpleShowLayout, BooleanField} from "react-admin";
const InterneShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const InterneShow = () => (
  <Show actions={<InterneShowActions />}>
    <SimpleShowLayout>
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <EmailField source="email" label="Email" />
      <ReferenceField source="mentorId" reference="Employees">
        <TextField source="firstName" label="Mentor Prénom"/>
        <TextField source="lastName" label="Mentor Nom"/>
      </ReferenceField>
      <ReferenceField source='mentorId' reference='Departments'>
        <TextField source='name' label='Département'/>
      </ReferenceField>
      <BooleanField source="paid" label="Payé" />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
    </SimpleShowLayout>
  </Show>
);