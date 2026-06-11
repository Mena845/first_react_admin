import { Admin, EditGuesser, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { Dashboard } from "./Dashboard/Dashboard";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { InternList } from "./interns/InternList";
import { InternCreate } from "./interns/InternCreate";
import { InternShow } from "./interns/InternShow";
import { createTheme } from "@mui/material/styles";
import authProvider from "./authProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#29b6f6",
      light: "#81d4fa",
      dark: "#0288d1",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "6px 20px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#fff",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },
        },
        notchedOutline: {
          borderColor: "#e0e0e0",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#fff",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            fontWeight: 600,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}
    layout={Layout}
    theme={theme}
  >
    <Resource
      name="Employees"
      list={EmployeeList}
      create={EmployeeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
    />
    <Resource
      name="interns"
      list={InternList}
      create={InternCreate}
      edit={EditGuesser}
      show={InternShow}
    />
  </Admin>
);