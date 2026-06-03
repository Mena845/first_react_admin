import { useState } from "react";
import { useCreate, useNotify, useRefresh } from "react-admin";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const QuickAddInternModal = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const notify = useNotify();
  const refresh = useRefresh();

  const [create, { isPending }] = useCreate();

  const handleOpen = () => {
    setOpen(true);
    setFormError(null);
    setFirstName("");
    setLastName("");
    setMentorId("");
  };

  const handleClose = () => {
    if (!isPending) setOpen(false);
  };

  const handleSubmit = () => {
    // Validation minimale
    if (!firstName.trim() || !lastName.trim()) {
      setFormError("Le prénom et le nom sont obligatoires.");
      return;
    }

    setFormError(null);

    create(
      "Internes",
      {
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          mentorId: mentorId ? Number(mentorId) : null,
          paid: false,
        },
      },
      {
        onSuccess: () => {
          notify("Stagiaire créé avec succès", { type: "success" });
          refresh();
          setOpen(false);
        },
        onError: (error: unknown) => {
          const message =
            error instanceof Error ? error.message : "Erreur lors de la création.";
          setFormError(message);
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
        sx={{ mb: 2 }}
      >
        Ajouter stagiaire rapide
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Nouveau stagiaire (rapide)</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {formError && <Alert severity="error">{formError}</Alert>}

            <TextField
              label="Prénom *"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isPending}
              fullWidth
            />
            <TextField
              label="Nom *"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isPending}
              fullWidth
            />
            <TextField
              label="ID Manager (optionnel)"
              value={mentorId}
              onChange={(e) => setMentorId(e.target.value)}
              disabled={isPending}
              type="number"
              fullWidth
              helperText="Entrez l'identifiant numérique du manager"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Création…" : "Créer"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};