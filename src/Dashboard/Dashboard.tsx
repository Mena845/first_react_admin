import { useGetList } from "react-admin";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate } from "react-router-dom";

const StatCard = ({
  title,
  value,
  icon,
  color,
  onClick,
  bgcolor,
}: {
  title: string;
  value: number | undefined;
  icon: React.ReactNode;
  color: string;
  bgcolor: string;
  onClick: () => void;
}) => (
  <Card
    sx={{
      height: "100%",
      minHeight: 150,
      minWidth: 200,
      cursor: "pointer",
      transition: "box-shadow 0.2s",
      "&:hover": { boxShadow: 6 },
      bgcolor,  
    }}
    onClick={onClick}
  >
    <CardContent >
      <Box display="flex" alignItems="center"  gap={2} mb={1}>
        <Box sx={{ color }}>{icon}</Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" textAlign="center" fontWeight="bold" sx={{ color }}>
        {value ?? "…"}
      </Typography>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const navigate = useNavigate();

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
        <Grid item xs={12} sm={6} md={3} sx={{ minHeight: 160 , minWidth: 260}}>
          <StatCard
            title="Total employés"
            value={totalEmployees}
            icon={<PeopleIcon fontSize="large" />}
            color="#1976d2" bgcolor="#e3f2fd"
            onClick={() => navigate("/Employees")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ minHeight: 160 , minWidth: 260}}>
          <StatCard
            title="Employés actifs"
            value={activeEmployees}
            icon={<CheckCircleIcon fontSize="large" />}
            color="#2e7d32" bgcolor="#e8f5e9"
            onClick={() => navigate("/Employees?filter=%7B%22isActive%22%3Atrue%7D")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ minHeight: 160 , minWidth: 260}}>
          <StatCard
            title="Total stagiaires"
            value={totalInterns}
            icon={<SchoolIcon fontSize="large" />}
            color="#ed6c02" bgcolor="#fff3e0" 
            onClick={() => navigate("/Internes")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ minHeight: 160 , minWidth: 260}}>
          <StatCard
            title="Stagiaires rémunérés"
            value={paidInterns}
            icon={<PaidIcon fontSize="large" />}
            color="#9c27b0" bgcolor="#f3e5f5"
            onClick={() => navigate("/Internes?filter=%7B%22paid%22%3Atrue%7D")}
          />
        </Grid>
      </Grid>
    </Box>
  );
};