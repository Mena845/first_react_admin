import {
  TopToolbar, ListButton, EditButton, TextField, EmailField,
  NumberField, Show, SimpleShowLayout, BooleanField, DateField,
} from "react-admin";
import { ManagerCard } from "../Componenst/ManagerCard";

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
      <BooleanField source="paid" label="Payé" />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <DateField source="enterDate" label="Date d'Entrée" />
      <ManagerCard />  {/* ← useRecordContext + useGetOne */}
    </SimpleShowLayout>
  </Show>
);