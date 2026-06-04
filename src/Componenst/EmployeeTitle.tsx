import { useRecordContext } from "react-admin";
export const EmployeeTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span>
      Modifier : {record.firstName} {record.lastName}
    </span>
  );
  
};