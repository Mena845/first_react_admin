import { useRecordContext } from "react-admin";
export const InternShowName = () => {
    const record = useRecordContext();

    return record ? (
        <span>
          interne : {record.firstName} {record.lastName}
        </span>
    ) : null;
};