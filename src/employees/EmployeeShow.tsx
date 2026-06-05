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
  useRecordContext,
  useGetList,
} from "react-admin";
import { Chip, Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const EmployeeTitle = () => {
  const record = useRecordContext<{ firstName: string; lastName: string }>();
  if (!record) return null;
  return (
    <span>
      {record.firstName} {record.lastName}
    </span>
  );
};

const EmployeeShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

const SupervisedInterns = () => {
  const record = useRecordContext<{ id: number }>();
  const { data: interns = [] } = useGetList("Interns", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
    filter: { mentorId: record?.id },
  });

  if (!interns.length) return null;

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Stagiaires encadrés ({interns.length})
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {interns.map((intern) => (
            <Typography
              key={intern.id}
              component={Link}
              to={`/interns/${intern.id}/show`}
              sx={{
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {intern.firstName} {intern.lastName}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export const EmployeeShow = () => (
  <Show title={<EmployeeTitle />} actions={<EmployeeShowActions />}>
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
      <SupervisedInterns />
    </SimpleShowLayout>
  </Show>
);
