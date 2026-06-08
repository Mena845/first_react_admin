import {
  useRecordContext,
  useGetList,
} from "react-admin";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const SupervisedInterns = () => {
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
