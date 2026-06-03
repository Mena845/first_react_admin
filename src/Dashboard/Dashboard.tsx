import { useGetList } from "react-admin";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import PaidIcon from "@mui/icons-material/Paid";

const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number | undefined;
  icon: React.ReactNode;
  color: string;
}) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Box sx={{ color }}>{icon}</Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" fontWeight="bold" sx={{ color }}>
        {value ?? "…"}
      </Typography>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { total: totalEmployees } = useGetList("Employees", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: activeEmployees } = useGetList("Employees", {
    pagination: { page: 1, perPage: 1 },
    filter: { isActive: true },
  });

  const { total: totalInterns } = useGetList("Internes", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: paidInterns } = useGetList("Internes", {
    pagination: { page: 1, perPage: 1 },
    filter: { paid: true },
  });

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Total employés"
            value={totalEmployees}
            icon={<PeopleIcon fontSize="large" />}
            color="#1976d2"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Employés actifs"
            value={activeEmployees}
            icon={<CheckCircleIcon fontSize="large" />}
            color="#2e7d32"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Total stagiaires"
            value={totalInterns}
            icon={<SchoolIcon fontSize="large" />}
            color="#ed6c02"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Stagiaires rémunérés"
            value={paidInterns}
            icon={<PaidIcon fontSize="large" />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>
    </Box>
  );
};