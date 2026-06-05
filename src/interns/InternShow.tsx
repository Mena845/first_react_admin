import {
  TopToolbar,
  ListButton,
  EditButton,
  TextField,
  EmailField,
  NumberField,
  Show,
  SimpleShowLayout,
  DateField,
  FunctionField,
  ReferenceField,
  useRecordContext,
  useGetList,
} from "react-admin";
import { Chip, Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const InternShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

const ManagerCard = () => {
  const record = useRecordContext<{ mentorId: number }>();
  const { data: employees = [] } = useGetList("Employees", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
    filter: { id: record?.mentorId },
  });

  const manager = employees[0];
  if (!manager) return null;

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#f0f7ff", borderColor: "#bbdefb", mt: 2 }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Manager
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            component={Link}
            to={`/employees/${manager.id}/show`}
            sx={{
              fontWeight: 600,
              fontSize: "1.05rem",
              color: "primary.main",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {manager.firstName} {manager.lastName}
          </Typography>
          <Chip label={manager.isActive ? "Actif" : "Inactif"} size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {manager.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

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
      <ManagerCard />
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
