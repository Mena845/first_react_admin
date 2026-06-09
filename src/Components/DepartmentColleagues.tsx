import { useRecordContext, useGetList } from "react-admin";
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

export const DepartmentColleagues = () => {
  const record = useRecordContext<{ id: number; department: number }>();

  const { data: colleagues = [], isPending, error } = useGetList("Employees", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
    filter: { department: record?.department },
  });

  if (!record) return null;

  const others = colleagues.filter((c) => c.id !== record.id);

  if (isPending) {
    return (
      <Box display="flex" alignItems="center" gap={1} mt={3}>
        <CircularProgress size={20} />
        <Typography variant="body2">Chargement des collègues...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        Impossible de charger les collègues du département.
      </Alert>
    );
  }

  if (!others.length) {
    return (
      <Alert severity="info" sx={{ mt: 3 }}>
        Aucun autre employé dans ce département.
      </Alert>
    );
  }

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <PeopleIcon color="primary" />
          <Typography variant="h6">
            Collègues du département ({others.length})
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {others.map((colleague) => (
            <Typography
              key={colleague.id}
              component={Link}
              to={`/Employees/${colleague.id}/show`}
              sx={{
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {colleague.firstName} {colleague.lastName}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
