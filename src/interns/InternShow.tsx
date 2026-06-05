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
  DateField,
  FunctionField,
} from "react-admin";
import { Chip, Box } from "@mui/material";

const InternShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const InternShow = () => (
  <Show actions={<InternShowActions />}>
    <SimpleShowLayout
      sx={{
        "& .RaLabeled-label": {
          fontWeight: 600,
          color: "text.secondary",
          minWidth: 140,
        },
        "& .MuiBox-root": { py: 1 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField source="firstName" label="Prénom" />
        <TextField source="lastName" label="Nom" />
      </Box>
      <EmailField source="email" label="Email" sx={{ fontWeight: 500 }} />
      <ReferenceField
        source="mentorId"
        reference="Employees"
        label="Manager"
        link="show"
      >
        <FunctionField
          render={(record) => `${record.firstName} ${record.lastName}`}
        />
      </ReferenceField>
      <ReferenceField
        source="department"
        reference="Departments"
        label="Département"
      >
        <TextField source="name" />
      </ReferenceField>
      <FunctionField
        label="Payé"
        render={(record: { paid: boolean }) => (
          <Chip
            label={record.paid ? "Payé" : "Impayé"}
            color={record.paid ? "success" : "warning"}
            size="small"
            variant={record.paid ? "filled" : "outlined"}
          />
        )}
      />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
        sx={{ fontWeight: 700, color: "success.dark", fontSize: "1.1rem" }}
      />
      <DateField
        source="enterDate"
        label="Date d'entrée"
        options={{ dateStyle: "short" }}
      />
    </SimpleShowLayout>
  </Show>
);
