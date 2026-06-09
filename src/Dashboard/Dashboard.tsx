import { useGetList } from "react-admin";
import { Card, CardContent, Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from "@mui/material";
import { StatCard } from "../Components/StatCard";
import { formatCurrency } from "../Components/formatCurrency";

export const Dashboard = () => {
  const { data: employees = [] } = useGetList("Employees", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });

  const { data: interns = [] } = useGetList("Interns", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });

  const { data: departments = [] } = useGetList("Departments", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });

  const activeEmployees = employees.filter((e) => e.isActive);
  const paidInterns = interns.filter((i) => i.paid);
  const totalSalary = employees.reduce((s, e) => s + (e.salary ?? 0), 0) + interns.reduce((s, i) => s + (i.salary ?? 0), 0);

  const totalSalaryEmployees = employees.reduce((sum, e) => sum + (e.salary ?? 0), 0);
  const totalSalaryInterns = interns.reduce((sum, i) => sum + (i.salary ?? 0), 0);
  const avgSalaryEmployees = employees.length ? Math.round(totalSalaryEmployees / employees.length) : 0;

  const byDepartment = departments.map((dept) => {
    const emp = employees.filter((e) => e.department === dept.id);
    const int = interns.filter((i) => i.department === dept.id);
    return {
      name: dept.name,
      employees: emp.length,
      activeEmployees: emp.filter((e) => e.isActive).length,
      interns: int.length,
      paidInterns: int.filter((i) => i.paid).length,
      salaryEmployees: emp.reduce((s, e) => s + (e.salary ?? 0), 0),
      salaryInterns: int.reduce((s, i) => s + (i.salary ?? 0), 0),
    };
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Employés" value={employees.length} color="primary.main" to="/employees" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Employés actifs" value={activeEmployees.length} color="success.main" to="/employees" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Stagiaires" value={interns.length} color="warning.main" to="/interns" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Stagiaires rémunérés" value={paidInterns.length} color="info.main" to="/interns" />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Masse salariale totale" value={formatCurrency(totalSalary)} color="error.main" to="/employees" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Salaire moyen (employés)" value={formatCurrency(avgSalaryEmployees)} color="secondary.main" to="/employees" />
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Répartition par département
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Département</TableCell>
                  <TableCell align="right">Employés</TableCell>
                  <TableCell align="right">Actifs</TableCell>
                  <TableCell align="right">Stagiaires</TableCell>
                  <TableCell align="right">Payés</TableCell>
                  <TableCell align="right">Masse salariale</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {byDepartment.map((d) => (
                  <TableRow key={d.name}>
                    <TableCell>{d.name}</TableCell>
                    <TableCell align="right">{d.employees}</TableCell>
                    <TableCell align="right">{d.activeEmployees}</TableCell>
                    <TableCell align="right">{d.interns}</TableCell>
                    <TableCell align="right">{d.paidInterns}</TableCell>
                    <TableCell align="right">{formatCurrency(d.salaryEmployees + d.salaryInterns)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};
