import {
  BooleanField,
  DataTable,
  DeleteButton,
  EditButton,
  EmailField,
  List,
  NumberField,
  ReferenceField,
  SelectInput,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { QuickAddInternModal } from "../Componenst/QuickAddInternModal";

const internsFilters = [
  <TextInput label="Recherche" source="q" alwaysOn />,
  <SelectInput
    source="paid"
    label="Payé"
    choices={[
      { id: "true", name: "Oui" },
      { id: "false", name: "Non" },
    ]}
  />,
];

const ListActions = () => (
  <TopToolbar>
    <QuickAddInternModal />
  </TopToolbar>
);

export const InterneList = () => (
  <List filters={internsFilters} actions={<ListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="firstName" label="Prénom" />
      <DataTable.Col source="lastName" label="Nom" />
      <DataTable.Col source="email">
        <EmailField source="email" />
      </DataTable.Col>
      <DataTable.Col source="mentorId" label="Manager">
        <ReferenceField source="mentorId" reference="Employees" link="show">
          <TextField source="firstName" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col label="Département">
        <ReferenceField source="mentorId" reference="Departments">
          <TextField source="name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="paid" label="Payé">
        <BooleanField source="paid" />
      </DataTable.Col>
      <DataTable.Col source="salary" label="Salaire">
        <NumberField
          source="salary"
          options={{ style: "currency", currency: "EUR" }}
        />
      </DataTable.Col>
      <DataTable.Col>
        <EditButton />
      </DataTable.Col>
      <DataTable.Col>
        <DeleteButton />
      </DataTable.Col>
    </DataTable>
  </List>
);