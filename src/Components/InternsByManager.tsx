import { useRecordContext, useGetList } from "react-admin";
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";

export const InternsByManager = () => {
  const employee = useRecordContext<{ id: number }>();

  const { data: interns = [], total, isPending, error } = useGetList("Interns", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
    filter: { mentorId: employee?.id },
  });

  if (!employee) return null;

  if (isPending) {
    return (
      <Box display="flex" alignItems="center" gap={1} mt={3}>
        <CircularProgress size={20} />
        <Typography variant="body2">Chargement des stagiaires...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        Erreur lors du chargement des stagiaires.
      </Alert>
    );
  }

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <SchoolIcon color="primary" />
          <Typography variant="h6">
            Stagiaires encadrés ({total})
          </Typography>
        </Box>
        {interns.length === 0 ? (
          <Alert severity="info">Aucun stagiaire encadré.</Alert>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {interns.map((intern) => (
              <Box
                key={intern.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    component={Link}
                    to={`/interns/${intern.id}/show`}
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {intern.firstName} {intern.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {intern.email}
                  </Typography>
                </Box>
                <Chip
                  label={intern.paid ? "Payé" : "Impayé"}
                  color={intern.paid ? "success" : "warning"}
                  size="small"
                  variant={intern.paid ? "filled" : "outlined"}
                />
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
