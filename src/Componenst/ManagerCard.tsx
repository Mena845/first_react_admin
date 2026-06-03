// src/Componenst/ManagerCard.tsx
import { useRecordContext, useGetOne } from "react-admin";
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export const ManagerCard = () => {
  const record = useRecordContext(); // ← récupère le stagiaire courant

  const {
    data: manager,
    isPending,
    error,
  } = useGetOne(
    "Employees",
    { id: record?.mentorId },
    { enabled: !!record?.mentorId } // ← n'appelle pas l'API si pas de mentorId
  );

  if (!record) return null;

  // État 1 : chargement
  if (isPending) {
    return (
      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <CircularProgress size={20} />
        <Typography variant="body2">Chargement du manager...</Typography>
      </Box>
    );
  }

  // État 2 : erreur
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Impossible de charger le manager.
      </Alert>
    );
  }

  // État 3 : données
  if (!manager) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Aucun manager assigné.
      </Alert>
    );
  }

  return (
    <Card variant="outlined" sx={{ mt: 2, maxWidth: 300 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <PersonIcon color="primary" />
          <Typography variant="subtitle2" color="text.secondary">
            Manager
          </Typography>
        </Box>
        <Typography variant="h6" fontWeight="bold">
          {manager.firstName} {manager.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {manager.email}
        </Typography>
      </CardContent>
    </Card>
  );
};