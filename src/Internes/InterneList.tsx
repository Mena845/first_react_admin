
import { BooleanField, DataTable, DateField, EditButton, EmailField, FunctionField, List, NumberField, RecordContext, ReferenceField, ReferenceInput, SelectInput, TextField, TextInput } from 'react-admin';

const internsFilters = [
    <TextInput label="search" source="q" alwaysOn/>,
    <ReferenceInput source="mentorId" reference="Departments" label="Departments">
           <SelectInput optionText="name"/>
    </ReferenceInput>,
    <SelectInput source="paid" label="Payé" choices={[
        { id: true, name: 'Yes' },
        { id: false, name: 'No' },
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
            <DataTable.Col source="mentorId">
                <ReferenceField source="mentorId" reference="Employees">
                    <FunctionField render={(record) => `${record.firstName} ${record.lastName}`} />
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
                <NumberField source="salary" />
            </DataTable.Col>
        </DataTable>
          <EditButton />
    </List>
   
);