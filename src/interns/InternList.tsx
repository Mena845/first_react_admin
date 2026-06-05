import { useState } from "react";
import {
  BooleanField,
  DataTable,
  EditButton,
  EmailField,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  useCreate,
  useRefresh,
  useGetList,
} from "react-admin";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField as MuiTextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  Box,
} from "@mui/material";

export const InternList = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [create, { isLoading }] = useCreate();
  const refresh = useRefresh();
  const { data: employees } = useGetList("Employees", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });

  const handleSubmit = () => {
    setError(null);
    create(
      "interns",
      {
        data: {
          firstName,
          lastName,
          mentorId: parseInt(mentorId, 10),
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
          setFirstName("");
          setLastName("");
          setMentorId("");
          refresh();
        },
        onError: (err: Error) => {
          setError(err.message || "Erreur lors de la création du stagiaire");
        },
      },
    );
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Ajouter stagiaire rapide
        </Button>
      </Box>
      <List>
        <DataTable>
          <DataTable.Col source="id" />
          <DataTable.Col source="firstName" />
          <DataTable.Col source="lastName" />
          <DataTable.Col source="email">
            <EmailField source="email" />
          </DataTable.Col>
          <DataTable.Col source="mentorId">
            <ReferenceField source="mentorId" reference="Employees">
              <FunctionField
                render={(record) => `${record.firstName} ${record.lastName}`}
              />
            </ReferenceField>
          </DataTable.Col>
          <DataTable.Col label="Department">
            <ReferenceField source="department" reference="Departments">
              <TextField source="name" />
            </ReferenceField>
          </DataTable.Col>
          <DataTable.Col source="paid">
            <BooleanField source="paid" />
          </DataTable.Col>
          <DataTable.Col source="salary">
            <NumberField source="salary" />
          </DataTable.Col>
        </DataTable>
        <EditButton />
      </List>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Ajouter un stagiaire</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <MuiTextField
            label="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <MuiTextField
            label="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="manager-label">Manager</InputLabel>
            <Select
              labelId="manager-label"
              value={mentorId}
              onChange={(e) => setMentorId(e.target.value)}
              label="Manager"
            >
              {employees?.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!firstName || !lastName || !mentorId || isLoading}
          >
            {isLoading ? "Création..." : "Créer"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
