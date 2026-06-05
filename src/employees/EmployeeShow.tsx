import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  EmailField,
  TopToolbar,
  ListButton,
  EditButton,
  ReferenceField,
  FunctionField,
} from "react-admin";
import { Chip, Box } from "@mui/material";

const EmployeeShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const EmployeeShow = () => (
  <Show actions={<EmployeeShowActions />}>
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
        source="department"
        reference="Departments"
        label="Département"
      >
        <TextField source="name" />
      </ReferenceField>
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
        sx={{ fontWeight: 700, color: "success.dark", fontSize: "1.1rem" }}
      />
      <FunctionField
        label="Statut"
        render={(record: { isActive: boolean }) => (
          <Chip
            label={record.isActive ? "Actif" : "Inactif"}
            color={record.isActive ? "success" : "default"}
            size="small"
            variant={record.isActive ? "filled" : "outlined"}
          />
        )}
      />
      <EditButton />
    </SimpleShowLayout>
  </Show>
);
