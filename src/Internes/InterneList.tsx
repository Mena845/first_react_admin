
import { BooleanField, DataTable, DateField, EditButton, EmailField, FunctionField, List, NumberField, RecordContext, ReferenceField, TextField } from 'react-admin';

export const InterneList = () => (
    <List>
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