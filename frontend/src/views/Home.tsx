import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import { get } from "../util/api";
import Log from "../interfaces/Log";
import BasicSpinner from "../components/Spinner";
import Error from "../components/Error";

function Home() {
    const {
        data: logs,
        isLoading,
        error,
    } = useQuery({
        queryFn: async () => {
            const logs: Log[] = await get("logs");
            return logs;
        },
        queryKey: ["logs"],
    });

    if (isLoading) return <BasicSpinner />;
    if (error) return <Error error={String(error)} />;

    return (
        <div className="mt-5 px-3 dark-mode">
            <h1 className="display-5 fw-bold text-body-emphasis mb-5 text-center ">Latest Activity</h1>
            {logs?.length === 0 ? (
                <p className="text-center">There are no logs available</p>
            ) : (
                <ListGroup>
                    {logs?.map((log) => (
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-center"
                            key={log.id}
                        >
                            <p className="my-1 d-none d-md-block">{log.time}</p>
                            <Link
                                className="my-1 fw-bold text-decoration-none"
                                to={`/cards/${log.cardUid}`}
                            >
                                UID: {log.cardUid}
                            </Link>
                            {log.status ? (
                                <Badge bg="success">Online</Badge>
                            ) : (
                                <Badge bg="danger">Offline</Badge>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}

export default Home;
