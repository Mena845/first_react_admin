import {
    Edit,
    SimpleForm,
    TextInput,
    useRecordContext,
    required,
    ReferenceInput,
    email,
    SelectInput,
    BooleanInput,
    DateInput
} from "react-admin";
import { SalaryInput, MentorInput } from "./InterneCreate";

const InternTitle = () => {
    const record = useRecordContext();

    return record ? (
        <span>
            Modifier : {record.firstName} {record.lastName}
        </span>
    ) : null;
};

export const InternEdit = () => (
    <Edit title={<InternTitle />} redirect="list">
            <SimpleForm>
              <TextInput source="firstName" label="Prénom" validate={required()} />
              <TextInput source="lastName" label="Nom" validate={required()} />
              <TextInput
                source="email"
                label="Email"
                validate={[required(), email()]}
              />
              <ReferenceInput
            source="department"
            reference="Departments"
            label="Département"
        >
            <SelectInput
                optionText="name"
                validate={required()}
            />
        </ReferenceInput>
        
              <MentorInput />
              <BooleanInput source="paid" label="Payé" validate={required()}/>
              <SalaryInput />
              <DateInput
              source="enterDate" label="Date d'Entrée"/>
            </SimpleForm>
    </Edit>
);