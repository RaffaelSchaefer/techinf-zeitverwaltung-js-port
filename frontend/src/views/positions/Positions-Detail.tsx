import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { PositionDetail } from "../../interfaces/Position";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

import { Container, ListGroup, Button } from "react-bootstrap";

function Position_Detail() {
    const [position, setPosition] = useState<PositionDetail>();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams<{ id: string }>();
    const url = `http://localhost:80/positions/${id}`;

    useEffect(() => {
        const updatePosition = async () => {
            try {
                const response = await axios.get(url);
                setPosition(response.data.data);
                setError(response.data.error);
                setLoading(false);
            } catch (error) {
                setError(String(error));
                setLoading(false);
            }
        };
        updatePosition();
    }, [url]);

    return (
        <Container className="mt-3">
            {loading ? (
                <BasicSpinner />
            ) : (
                <>
                    <h1 className="display-3 text-center ">{position?.name}</h1>
                    {error && <Error error={error}></Error>}
                    <h2 className="h5 my-2">All {position?.name}s</h2>
                    {position?.Users && position.Users.length > 0 ? (
                        <ListGroup>
                            {position?.Users.map((user) => (
                                <ListGroup.Item
                                    action
                                    as={Link}
                                    to={`/users/${user.id}`}
                                    className="d-flex justify-content-between align-items-center"
                                    key={user.id}
                                >
                                    {user.first_name} {user.last_name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>There are no Users with this Position</p>
                    )}
                    <Container className="fixed-bottom pb-3">
                        <Link to={`/positions/update/${position?.id}`}>
                            <Button variant="warning" className="mb-1">Update position</Button>
                        </Link>
                        <Button variant="danger" className="ms-1 mb-1">Remove position</Button>
                    </Container>
                </>
            )}
        </Container>
    );
}

export default Position_Detail;
