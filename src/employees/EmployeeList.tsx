import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  FunctionField,
} from "react-admin";
import { EmployeeFilter } from "../Components/EmployeeFiltersList";
import { ActiveChip } from "../Components/ActiveChip";

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