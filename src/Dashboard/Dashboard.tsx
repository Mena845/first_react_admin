import { useGetList } from "react-admin";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { StatCard } from "../Components/StatCard";

export const Dashboard = () => {
  const { data: employees = [] } = useGetList("Employees", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });

  const { data: interns = [] } = useGetList("Interns", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });

  const activeEmployees = employees.filter((e) => e.isActive);
  const paidInterns = interns.filter((i) => i.paid);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Employés"
            value={employees.length}
            color="primary.main"
            to="/employees"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Employés actifs"
            value={activeEmployees.length}
            color="success.main"
            to="/employees"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Stagiaires"
            value={interns.length}
            color="warning.main"
            to="/interns"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Stagiaires rémunérés"
            value={paidInterns.length}
            color="info.main"
            to="/interns"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
