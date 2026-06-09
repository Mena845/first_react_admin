import { useRecordContext, useGetList } from "react-admin";
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

export const DepartmentStats = () => {
  const employee = useRecordContext<{ department: number }>();

  const { total, isPending, error } = useGetList("Employees", {
    filter: {
      department: employee?.department,
      isActive: true,
    },
    pagination: { page: 1, perPage: 1 },
  });

  if (!employee) return null;

  if (isPending) {
    return (
      <Box display="flex" alignItems="center" gap={1} mt={3}>
        <CircularProgress size={20} />
        <Typography variant="body2">Calcul des statistiques...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        Erreur lors du calcul des statistiques.
      </Alert>
    );
  }

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <GroupIcon color="primary" />
          <Typography variant="h6">Statistiques du département</Typography>
        </Box>
        <Typography variant="body1">
          Collègues actifs dans ce département : <strong>{total}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
};
