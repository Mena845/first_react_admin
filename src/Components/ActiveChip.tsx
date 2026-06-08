import { Chip } from "@mui/material";

export const ActiveChip = ({ record }: { record: { isActive: boolean } }) => (
  <Chip
    label={record.isActive ? "Actif" : "Inactif"}
    color={record.isActive ? "success" : "default"}
    size="small"
    variant={record.isActive ? "filled" : "outlined"}
  />
);
