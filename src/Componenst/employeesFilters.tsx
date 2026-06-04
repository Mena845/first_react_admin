import {
    TextInput,
    ReferenceInput,
    SelectInput
} from "react-admin";

export const employeesFilters = [
    <TextInput label="search" source="q" alwaysOn/>,
    <ReferenceInput source="department" reference="Departments" label="Departments">
           <SelectInput optionText="name"/>
    </ReferenceInput>,
    <SelectInput source="active" label="Actif" choices={[
        { id: true, name: 'Yes' },
        { id: false, name: 'No' },
    ]} />
];