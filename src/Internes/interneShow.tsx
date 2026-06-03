import {TopToolbar, ListButton, EditButton, TextField, EmailField, NumberField, ReferenceField, Show, SimpleShowLayout, BooleanField, DateField, useRecordContext} from "react-admin";
const InterneShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

const MentorFullName = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span>
      {record.firstName} {record.lastName}
    </span>
  );
};

export const InterneShow = () => (
  <Show actions={<InterneShowActions />}>
    <SimpleShowLayout>
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <EmailField source="email" label="Email" />
      <ReferenceField source="mentorId" reference="Employees">
        <MentorFullName />
      </ReferenceField>
      <ReferenceField source='mentorId' reference='Departments'>
        <TextField source='name' label='Department'/>
      </ReferenceField>
      <BooleanField source="paid" label="Payé" />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <DateField source="enterDate" label="Date d'Entree" options={{dateStyle: "short"}}/>
    </SimpleShowLayout>
  </Show>
);