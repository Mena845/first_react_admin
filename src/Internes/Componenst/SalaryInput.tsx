import {
    required,
    NumberInput,
    minValue
} from "react-admin";
import { useWatch } from "react-hook-form";
export const SalaryInput = () => {
  const paid = useWatch({
    name: "paid",
  });
  if(!paid) return null;
  return (
    <NumberInput source="salary" label="Salaire" validate={[required(), minValue(0)]} />
  );
}