import {
    useRecordContext,
    useGetList,
    Link,
} from "react-admin";

export const InternsByManager = () => {
    const employee = useRecordContext();

    const {
        data: interns,
        total,
        isPending,
        error,
    } = useGetList("Internes", {
        filter: {
            mentorId: employee?.id,
        },
        pagination: {
            page: 1,
            perPage: 100,
        },
    });

    if (!employee) return null;

    if (isPending) {
        return <p>Chargement des stagiaires...</p>;
    }

    if (error) {
        return <p>Erreur lors du chargement.</p>;
    }

    return (
        <div>
            <h3>Stagiaires encadrés ({total})</h3>

            {interns?.length === 0 && (
                <p>Aucun stagiaire encadré.</p>
            )}

            {interns?.map((intern) => (
                <div
                    key={intern.id}
                    style={{
                        borderBottom: "1px solid #ddd",
                        padding: "8px 0",
                    }}
                >
                    <div>
                        {intern.firstName} {intern.lastName}
                    </div>

                    <div>{intern.email}</div>

                    <a href={`#/Internes/${intern.id}/show`}>
                        Voir la fiche
                    </a>
                </div>
            ))}
        </div>
    );
};