import { useRecordContext } from "react-admin";
export const InternTitle = () => {
    const record = useRecordContext();

    return record ? (
        <span>
            Modifier : {record.firstName} {record.lastName}
        </span>
    ) : null;
};