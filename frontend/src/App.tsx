import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import axios from "axios";

import Log from "./interfaces/Log";

import Error from "./components/Error";

function App() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [error, setError] = useState<string>("");
    const url = "http://localhost:80/logs";

    useEffect(() => {
        updateLogs();
    }, []);

    const updateLogs = async () => {
        try {
            const response = await axios.get(url);
            setLogs(response.data.data);
            setError(response.data.error);
        } catch (error) {
            setError(String(error));
        }
    };

    return (
        <div className="mt-5 px-3 dark-mode">
            <h1 className="display-5 fw-bold text-body-emphasis mb-5 text-center ">
                Latest Activity
            </h1>
            {error && <Error error={error}></Error>}
            <ListGroup>
                {logs.map((log) => (
                    <ListGroup.Item
                        className="d-flex justify-content-between align-items-center"
                        key={log.id}
                    >
                        <p className="my-1 d-none d-md-block">{log.time}</p>
                        <a
                            className="my-1 fw-bold text-decoration-none"
                            href="#"
                        >
                            UID: {log.cardUid}
                        </a>
                        {log.status ? (
                            <Badge bg="success">Online</Badge>
                        ) : (
                            <Badge bg="danger">Offline</Badge>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default App;
