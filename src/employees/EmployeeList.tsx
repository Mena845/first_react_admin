import {
  List,
  Datagrid,
  TextField,
  NumberField,
  SearchInput,
  SelectInput,
  ReferenceField,
  FunctionField,
} from "react-admin";
import { Chip } from "@mui/material";

const EmployeeFilter = [
  <SearchInput
    source="q"
    alwaysOn
    key="search"
    sx={{
      "& .MuiInputBase-root": { backgroundColor: "#f5f9ff", borderRadius: 3 },
    }}
  />,
  <SelectInput
    source="department"
    choices={[
      { id: "1", name: "Informatique" },
      { id: "2", name: "Marketing" },
      { id: "3", name: "RH" },
    ]}
    key="department"
    sx={{
      "& .MuiInputBase-root": {
        backgroundColor: "#f5f9ff",
        borderRadius: 3,
        minWidth: 160,
      },
    }}
  />,
];

const ActiveChip = ({ record }: { record: { isActive: boolean } }) => (
  <Chip
    label={record.isActive ? "Actif" : "Inactif"}
    color={record.isActive ? "success" : "default"}
    size="small"
    variant={record.isActive ? "filled" : "outlined"}
  />
);

export const EmployeeList = () => (
  <List
    filters={EmployeeFilter}
    perPage={5}
    sx={{
      "& .RaList-actions": {
        backgroundColor: "#f8fbff",
        borderRadius: 3,
        p: 2,
        mb: 1,
      },
      "& .RaList-main": { borderRadius: 3 },
    }}
  >
    <Datagrid
      rowClick="show"
      rowSx={(record: { isActive: boolean }) => ({
        backgroundColor: record.isActive ? undefined : "#fafafa",
        opacity: record.isActive ? 1 : 0.75,
      })}
      sx={{
        "& .RaDatagrid-headerCell": {
          fontWeight: 700,
          backgroundColor: "#f0f7ff",
        },
      }}
    >
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <TextField source="email" label="Email" />
      <ReferenceField source="department" reference="Departments">
        <TextField source="name" />
      </ReferenceField>
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
        sx={{ fontWeight: 600, color: "success.dark" }}
      />
      <FunctionField
        label="Statut"
        render={(record) => <ActiveChip record={record} />}
      />
    </Datagrid>
  </List>
);
