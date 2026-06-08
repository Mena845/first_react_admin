import {
  SearchInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

export const internFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput source="department" reference="Departments" label="Département">
    <SelectInput optionText="name" />
  </ReferenceInput>,
  <SelectInput
    source="paid"
    label="Payé"
    choices={[
      { id: true, name: "Payé" },
      { id: false, name: "Impayé" },
    ]}
  />,
];
