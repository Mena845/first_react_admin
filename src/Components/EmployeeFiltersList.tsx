import {
  SearchInput,
  SelectInput,
} from "react-admin";

export const EmployeeFilter = [
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
