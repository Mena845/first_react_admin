import Button from "@mui/material/Button";
import {
    useRecordContext,
    useUpdate,
} from "react-admin";

export const QuickStatusToggle = () => {
    const record = useRecordContext();

    const [update, { isPending }] = useUpdate();

    if (!record) return null;

    const handleClick = () => {
        update("Employees", {
            id: record.id,
            data: {
                ...record,
                isActive: !record.isActive,
            },
            previousData: record,
        });
    };

    return (
        <Button
            variant="contained"
            color={
                record.isActive
                    ? "error"
                    : "success"
            }
            onClick={handleClick}
            disabled={isPending}
        >
            {record.isActive
                ? "Désactiver"
                : "Activer"}
        </Button>
    );
};