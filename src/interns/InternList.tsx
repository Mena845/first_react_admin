import {
  DataTable,
  EditButton,
  EmailField,
  FunctionField,
  List,
  ListActions,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";
import {
  Chip,
} from "@mui/material";
import { internFilters } from "../Components/internFiltersList";
import { QuickAddInternModal } from "../Components/QuickAddInternModal";

export const InternList = () => (
  <List
    filters={internFilters}
    actions={
      <ListActions>
        <QuickAddInternModal />
      </ListActions>
    }
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
    <DataTable
      sx={{
        "& .RaDataTable-headerCell": {
          fontWeight: 700,
          backgroundColor: "#f0f7ff",
        },
      }}
    >
      <DataTable.Col source="id" />
      <DataTable.Col source="firstName" label="Prénom" />
      <DataTable.Col source="lastName" label="Nom" />
      <DataTable.Col source="email">
        <EmailField source="email" />
      </DataTable.Col>
      <DataTable.Col source="mentorId" label="Manager">
        <ReferenceField source="mentorId" reference="Employees" link="show">
          <FunctionField
            render={(record) => `${record.firstName} ${record.lastName}`}
          />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col label="Département">
        <ReferenceField source="department" reference="Departments">
          <TextField source="name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="paid" label="Payé">
        <FunctionField
          render={(record: { paid: boolean }) => (
            <Chip
              label={record.paid ? "Payé" : "Impayé"}
              color={record.paid ? "success" : "warning"}
              size="small"
              variant={record.paid ? "filled" : "outlined"}
            />
          )}
        />
      </DataTable.Col>
      <DataTable.Col source="salary" label="Salaire">
        <NumberField
          source="salary"
          options={{ style: "currency", currency: "EUR" }}
          sx={{ fontWeight: 600, color: "success.dark" }}
        />
      </DataTable.Col>
    </DataTable>
    <EditButton />
  </List>
);
