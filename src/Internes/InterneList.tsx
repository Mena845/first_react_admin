
import { BooleanField, DataTable, DeleteButton, EditButton, EmailField,  List, NumberField, ReferenceField, ReferenceInput, SelectInput, TextField, TextInput } from 'react-admin';

const internsFilters = [
    <TextInput label="search" source="q" alwaysOn/>,
    <SelectInput source="paid" label="Payé" choices={[
        { id: 'true', name: 'Yes' },
        { id: 'false', name: 'No' },
    ]} />
];
export const InterneList = () => (
    <List filters={internsFilters}>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="firstName" />
            <DataTable.Col source="lastName" />
            <DataTable.Col source="email">
                <EmailField source="email" />
            </DataTable.Col>
            <DataTable.Col source="mentorId" label="Mentor">
    <ReferenceField source="mentorId" reference="Employees" link="show">
        <TextField source="firstName" />
    </ReferenceField>
</DataTable.Col>
                <DataTable.Col label='Departement'>
                        <ReferenceField source='mentorId' reference='Departments'>
                        <TextField source='name'/>
                    </ReferenceField>
                </DataTable.Col>
            <DataTable.Col source="paid">
    <BooleanField source="paid" />
</DataTable.Col>
            <DataTable.Col source="salary">
                <NumberField source="salary" options={{ style: 'currency', currency: 'EUR' }} />
            </DataTable.Col>
             <DataTable.Col >
             <EditButton />
            </DataTable.Col>
            <DataTable.Col >
              <DeleteButton />
            </DataTable.Col>
        </DataTable>
    </List>
   
);