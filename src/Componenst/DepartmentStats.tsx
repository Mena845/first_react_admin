import {
    useRecordContext,
    useGetList,
} from "react-admin";

export const DepartmentStats = () => {
    const employee = useRecordContext();

    const {
        total,
        isPending,
        error,
    } = useGetList("Employees", {
        filter: {
            department: employee?.department,
            isActive: true,
        },
        pagination: {
            page: 1,
            perPage: 1,
        },
    });

    if (!employee) return null;

    if (isPending) {
        return <p>Calcul des statistiques...</p>;
    }

    if (error) {
        return <p>Erreur.</p>;
    }

    return (
        <div>
            <h3>Statistiques du département</h3>

            <p>
                Nombre de collègues actifs : {total}
            </p>
        </div>
    );
};