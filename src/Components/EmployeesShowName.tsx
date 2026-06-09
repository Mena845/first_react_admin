import { useRecordContext } from "react-admin";
export const EmployeesShowName = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span>
       {record.firstName}
    </span>
  );
  
};