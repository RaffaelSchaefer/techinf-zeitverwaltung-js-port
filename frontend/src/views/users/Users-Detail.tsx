import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { UserDetail } from "../../interfaces/User";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

function User_Detail() {
    const [user, setUser] = useState<UserDetail>();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams<{ id: string }>();
    const url = `http://localhost:80/users/${id}`;

    useEffect(() => {
        updatePosition();
    }, []);

    const updatePosition = async () => {
        try {
            const response = await axios.get(url);
            setUser(response.data.data);
            setError(response.data.error);
            setLoading(false);
        } catch (error) {
            setError(String(error));
            setLoading(false);
        }
    };

    return (
        <Container className="mt-3">
            {loading ? (
                <BasicSpinner />
            ) : (
                <>
                    <h1 className="display-6">
                        {user?.first_name} {user?.last_name}
                        <Badge
                            className="mx-1"
                            bg={user?.status ? "success" : "danger"}
                        >
                            {user?.status ? "Online" : "Offline"}
                        </Badge>
                    </h1>
                    <Row>
                        <Col>
                            {error && <Error error={error}></Error>}
                            <ListGroup>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    ID: {user?.id}
                                </ListGroup.Item>
                                <ListGroup.Item
                                    className="d-flex justify-content-between align-items-center"
                                    action
                                    as={Link}
                                    to={`/positions/${user?.Position.id}`}
                                >
                                    Position: {user?.Position.name}
                                </ListGroup.Item>
                            </ListGroup>
                            <h2 className="h5 my-2">Cards</h2>
                            {user?.Cards && user?.Cards.length > 0 ? (
                                <ListGroup>
                                    {user?.Cards.map((card) => (
                                        <ListGroup.Item
                                            action
                                            as={Link}
                                            to={`/cards/${card.uid}`}
                                            className="d-flex justify-content-between align-items-center"
                                            key={card.uid}
                                        >
                                            {card.uid}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>User has no cards</p>
                            )}
                            <h2 className="h5 my-2">Addresses</h2>
                            {user?.Addresses && user?.Addresses.length > 0 ? (
                                <ListGroup>
                                    {user?.Addresses.map((address) => (
                                        <ListGroup.Item
                                            className="d-flex justify-content-between align-items-center"
                                            key={address.id}
                                        >
                                            {address.street_name}{" "}
                                            {address.house_number}{" "}
                                            {address.town_name}{" "}
                                            {address.postal_code}{" "}
                                            {address.country}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>User has no know address</p>
                            )}
                            <h2 className="h5 my-2">Logs</h2>
                            {user?.Logs && user?.Logs.length > 0 ? (
                                <ListGroup>
                                    {user?.Logs.map((log) => (
                                        <ListGroup.Item
                                            className="d-flex justify-content-between align-items-center"
                                            key={log.id}
                                        >
                                            <p className="my-1">{log.time}</p>
                                            <Link
                                                className="my-1 fw-bold text-decoration-none d-none d-md-block"
                                                to={`/cards/${log.cardUid}`}
                                            >
                                                UID: {log.cardUid}
                                            </Link>
                                            {log.status ? (
                                                <Badge bg="success">
                                                    Online
                                                </Badge>
                                            ) : (
                                                <Badge bg="danger">
                                                    Offline
                                                </Badge>
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>User has not logged any data yet</p>
                            )}
                        </Col>
                        <Col className="mx-auto d-none d-lg-block">
                            <img
                                className="rounded"
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.first_name} ${user?.last_name}`}
                                style={{ height: "200px" }}
                                alt="Profilbild"
                            />
                        </Col>
                    </Row>
                    <Container className="fixed-bottom pb-3">
                        <ButtonGroup>
                            <Button variant="success">
                                Grant Card Ownership
                            </Button>
                            <Button variant="primary">Update User</Button>
                            <Button variant="danger">Remove User</Button>
                        </ButtonGroup>
                    </Container>
                </>
            )}
        </Container>
    );
}

export default User_Detail;

//TODO Turn to Component
