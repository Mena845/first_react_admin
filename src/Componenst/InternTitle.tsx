import { useRecordContext } from "react-admin";

export const InternTitle = () => {
  const record = useRecordContext(); // ← obligatoire
  if (!record) return null;
  return (
    <span>
      Modifier : {record.firstName} {record.lastName}
    </span>
  );
};