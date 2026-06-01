
import { BooleanField, DataTable, DateField, EmailField, FunctionField, List, RecordContext, ReferenceField } from 'react-admin';

export const InterneList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="firstname" />
            <DataTable.Col source="lastname" />
            <DataTable.Col source="email">
                <EmailField source="email" />
            </DataTable.Col>
            <DataTable.Col source="mentorId">
                <ReferenceField source="mentorId" reference="employees">
                    <FunctionField render={(record) => `${record.firstname} ${record.lastname}`} />
                </ReferenceField>
            </DataTable.Col>
            <DataTable.Col source="paid">
                <BooleanField source="paid" />
            </DataTable.Col>
            <DataTable.Col source="salary">
                <DateField source="salary" />
            </DataTable.Col>
        </DataTable>
    </List>
);