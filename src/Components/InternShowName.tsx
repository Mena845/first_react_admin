import { useRecordContext } from "react-admin";
export const InternShowName = () => {
    const record = useRecordContext();

    return record ? (
        <span>
          {record.firstName}
        </span>
    ) : null;
};