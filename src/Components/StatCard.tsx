import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export const StatCard = ({
  label,
  value,
  color,
  to,
}: {
  label: string;
  value: string | number;
  color?: string;
  to: string;
}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        flex: 1,
        minWidth: 200,
        borderTop: 4,
        borderColor: color ?? "primary.main",
        cursor: "pointer",
        transition: "transform 0.15s, box-shadow 0.15s",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
      }}
      onClick={() => navigate(to)}
    >
      <CardContent>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};
