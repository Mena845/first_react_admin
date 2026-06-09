import { useState } from "react";
import { useCreate, useGetList, useRefresh } from "react-admin";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const QuickAddInternModal = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [managerId, setManagerId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [create, { isPending }] = useCreate();
  const refresh = useRefresh();

  const { data: employees } = useGetList("Employees", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });

  const handleOpen = () => {
    setOpen(true);
    setError(null);
    setFirstName("");
    setLastName("");
    setManagerId("");
  };

  const handleClose = () => {
    if (!isPending) setOpen(false);
    setError(null);
  };

  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Le prénom et le nom sont obligatoires.");
      return;
    }

    setError(null);

    create(
      "interns",
      {
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          mentorId: managerId ? parseInt(managerId, 10) : null,
          paid: false,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
          setFirstName("");
          setLastName("");
          setManagerId("");
          refresh();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : "Erreur lors de la création du stagiaire.";
          setError(message);
        },
      }
    );
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          borderRadius: 3,
          px: 3,
          py: 1,
          fontWeight: 700,
          fontSize: "0.9rem",
          boxShadow: "0 2px 8px rgba(25,118,210,0.3)",
          "&:hover": { boxShadow: "0 4px 16px rgba(25,118,210,0.4)" },
        }}
      >
        Ajouter stagiaire rapide
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Nouveau stagiaire (rapide)</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Prénom *"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isPending}
              fullWidth
              required
            />
            <TextField
              label="Nom *"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isPending}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel id="manager-label">Manager</InputLabel>
              <Select
                labelId="manager-label"
                value={managerId}
                onChange={(e) => setManagerId(e.target.value)}
                label="Manager"
                disabled={isPending}
              >
                {employees?.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isPending || !firstName.trim() || !lastName.trim()}
          >
            {isPending ? "Création…" : "Créer"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
