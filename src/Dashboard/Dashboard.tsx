import { useGetList } from "react-admin";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { StatCard } from "../Components/StatCard";
import { formatCurrency } from "../Components/formatCurrency";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: number;
  salary: number;
  isActive: boolean;
};

type Intern = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: number;
  mentorId: number;
  salary?: number;
  paid: boolean;
  enterDate?: string;
};

type Department = {
  id: number;
  name: string;
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { data: employees = [] } = useGetList<Employee>("Employees", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });
  const { data: interns = [] } = useGetList<Intern>("Interns", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });
  const { data: departments = [] } = useGetList<Department>("Departments", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });

  const activeEmployees = employees.filter((e) => e.isActive);
  const totalSalaryEmployees = employees.reduce(
    (sum, e) => sum + (e.salary ?? 0),
    0,
  );
  const totalSalaryInterns = interns.reduce(
    (sum, i) => sum + (i.salary ?? 0),
    0,
  );
  const totalSalary = totalSalaryEmployees + totalSalaryInterns;
  const avgSalaryEmployees =
    employees.length > 0
      ? Math.round(totalSalaryEmployees / employees.length)
      : 0;
  const paidInterns = interns.filter((i) => i.paid).length;

  const salaryByDept = departments
    .map((dept) => {
      const empSalaries = employees
        .filter((e) => e.department === dept.id)
        .map((e) => e.salary ?? 0);
      const intSalaries = interns
        .filter((i) => i.department === dept.id)
        .map((i) => i.salary ?? 0);
      const all = [...empSalaries, ...intSalaries];
      const avg =
        all.length > 0
          ? Math.round(all.reduce((a, b) => a + b, 0) / all.length)
          : 0;
      return {
        name: dept.name,
        avg,
        total: all.reduce((a, b) => a + b, 0),
        count: all.length,
      };
    })
    .filter((d) => d.count > 0);

  const empByDept = departments.map((dept) => ({
    name: dept.name,
    value: employees.filter((e) => e.department === dept.id).length,
  }));

  const recentInterns = [...interns].reverse().slice(0, 5);
  const recentEmployees = [...employees].reverse().slice(0, 5);

  const highestSalaryEmployee = employees.length
    ? employees.reduce((max, e) =>
        (e.salary ?? 0) > (max.salary ?? 0) ? e : max,
      )
    : null;
  const lowestSalaryEmployee = employees.length
    ? employees.reduce((min, e) =>
        (e.salary ?? 0) < (min.salary ?? 0) ? e : min,
      )
    : null;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => navigate("/employees/create")}
        >
          Créer employé
        </Button>
        <Button
          variant="contained"
          startIcon={<GroupAddIcon />}
          onClick={() => navigate("/interns/create")}
        >
          Créer interne
        </Button>
      </Stack>

      {/* Stats Cards */}
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        sx={{ mb: 3 }}
      >
        <StatCard
          label="Employés"
          value={employees.length}
          color="primary.main"
          to="/employees"
        />
        <StatCard
          label="Employés actifs"
          value={activeEmployees.length}
          color="success.main"
          to="/employees"
        />
        <StatCard
          label="Stagiaires"
          value={interns.length}
          color="warning.main"
          to="/interns"
        />
        <StatCard
          label="Salaire moyen (employés)"
          value={formatCurrency(avgSalaryEmployees)}
          color="info.main"
          to="/employees"
        />
        <StatCard
          label="Masse salariale totale"
          value={formatCurrency(totalSalary)}
          color="error.main"
          to="/employees"
        />
      </Stack>

      {/* Charts */}
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        sx={{ mb: 3 }}
      >
        <Card
          sx={{
            flex: 1,
            minWidth: 350,
            cursor: "pointer",
            "&:hover": { boxShadow: 4 },
          }}
          onClick={() => navigate("/employees")}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Salaire moyen par département
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salaryByDept}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="avg" fill="#0088FE" name="Salaire moyen" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card
          sx={{
            flex: 1,
            minWidth: 350,
            cursor: "pointer",
            "&:hover": { boxShadow: 4 },
          }}
          onClick={() => navigate("/employees")}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Employés par département
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={empByDept}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {empByDept.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Stack>

      {/* Recent Lists + Salary Overview */}
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        sx={{ mb: 3 }}
      >
        {/* Recent Interns */}
        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Derniers stagiaires
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Salaire</TableCell>
                    <TableCell>Payé</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentInterns.map((intern) => (
                    <TableRow
                      key={intern.id}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f5f5f5" },
                      }}
                      onClick={() => navigate(`/interns/${intern.id}/show`)}
                    >
                      <TableCell>
                        {intern.firstName} {intern.lastName}
                      </TableCell>
                      <TableCell>
                        {intern.salary != null
                          ? formatCurrency(intern.salary)
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={intern.paid ? "Oui" : "Non"}
                          color={intern.paid ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Recent Employees */}
        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Derniers employés
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Salaire</TableCell>
                    <TableCell>Actif</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentEmployees.map((emp) => (
                    <TableRow
                      key={emp.id}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f5f5f5" },
                      }}
                      onClick={() => navigate(`/employees/${emp.id}/show`)}
                    >
                      <TableCell>
                        {emp.firstName} {emp.lastName}
                      </TableCell>
                      <TableCell>{formatCurrency(emp.salary ?? 0)}</TableCell>
                      <TableCell>
                        <Chip
                          label={emp.isActive ? "Oui" : "Non"}
                          color={emp.isActive ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Stack>

      {/* Salary Management Overview */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Gestion des salaires
          </Typography>
          <Stack direction="row" spacing={4} useFlexGap flexWrap="wrap">
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Masse salariale employés
              </Typography>
              <Typography variant="h6">
                {formatCurrency(totalSalaryEmployees)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Masse salariale stagiaires
              </Typography>
              <Typography variant="h6">
                {formatCurrency(totalSalaryInterns)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Masse salariale totale
              </Typography>
              <Typography variant="h6">
                {formatCurrency(totalSalary)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Salaire moyen (employés)
              </Typography>
              <Typography variant="h6">
                {formatCurrency(avgSalaryEmployees)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Stagiaires payés
              </Typography>
              <Typography variant="h6">
                {paidInterns} / {interns.length}
              </Typography>
            </Box>
          </Stack>

          {highestSalaryEmployee && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Plus haut salaire
              </Typography>
              <Typography>
                {highestSalaryEmployee.firstName}{" "}
                {highestSalaryEmployee.lastName} —{" "}
                {formatCurrency(highestSalaryEmployee.salary ?? 0)}
              </Typography>
            </Box>
          )}
          {lowestSalaryEmployee && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Plus bas salaire
              </Typography>
              <Typography>
                {lowestSalaryEmployee.firstName} {lowestSalaryEmployee.lastName}{" "}
                — {formatCurrency(lowestSalaryEmployee.salary ?? 0)}
              </Typography>
            </Box>
          )}

          {salaryByDept.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Détail par département
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Département</TableCell>
                      <TableCell align="right">Effectif</TableCell>
                      <TableCell align="right">Masse salariale</TableCell>
                      <TableCell align="right">Salaire moyen</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salaryByDept.map((d) => (
                      <TableRow key={d.name}>
                        <TableCell>{d.name}</TableCell>
                        <TableCell align="right">{d.count}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(d.total)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(d.avg)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
