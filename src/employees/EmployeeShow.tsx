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
import {
  Chip,
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Stagiaires encadrés ({interns.length})
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Prénom</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Nom</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Salaire</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Payé</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>{intern.firstName}</TableCell>
                  <TableCell>{intern.lastName}</TableCell>
                  <TableCell>{intern.email}</TableCell>
                  <TableCell>
                    {intern.salary != null
                      ? formatCurrency(intern.salary)
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={intern.paid ? "Oui" : "Non"}
                      color={intern.paid ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

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
      <SupervisedInterns />
    </SimpleShowLayout>
  </Show>
);
