import { useRecordContext, useGetOne } from "react-admin";
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom"; 

export const ManagerCard = () => {
  const record = useRecordContext();
  const navigate = useNavigate();  

  const { data: manager, isPending, error } = useGetOne(
    "Employees",
    { id: record?.mentorId },
    { enabled: !!record?.mentorId }
  );

  if (!record) return null;

  if (isPending) {
    return (
      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <CircularProgress size={20} />
        <Typography variant="body2">Chargement du manager...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Impossible de charger le manager.
      </Alert>
    );
  }

  if (!manager) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Aucun manager assigné.
      </Alert>
    );
  }

  return (
    <Card
      variant="outlined"
      sx={{
        mt: 2,
        maxWidth: 300,
        border: "2px solid #1976d2",
        cursor: "pointer",                  
        "&:hover": { boxShadow: 4 },        
      }}
      onClick={() => navigate(`/Employees/${manager.id}/show`)}  
    >
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