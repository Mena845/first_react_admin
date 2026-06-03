import { ReferenceInput , SelectInput , required } from "react-admin";
import {useWatch} from "react-hook-form";
export const MentorInput = () => {
    const department = useWatch({
        name: "department",
    });

    return (
        <ReferenceInput
            source="mentorId"
            reference="Employees"
            filter={{
                department,
                isActive: true,
            }}
        >
            <SelectInput
                optionText={(record) =>
                    `${record.firstName} ${record.lastName}`
                }
                validate={required()}
            />
        </ReferenceInput>
    );
};