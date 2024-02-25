import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

import Position from "../../interfaces/Position";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

function Position_List() {
    const [positions, setPositions] = useState<Position[]>([]);
    const [search, setSearch] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const url = "http://localhost:80/positions";

    useEffect(() => {
        updatePositions();
    }, []);

    const updatePositions = async () => {
        try {
            const response = await axios.get(url);
            setPositions(response.data.data);
            setError(response.data.error);
            setLoading(false);
        } catch (error) {
            setError(String(error));
            setLoading(false);
        }
    };

    const filterPositions = async () => {
        try {
            setLoading(true);
            const response: Position[] = await (await axios.get(url)).data.data;
            setPositions(
                response.filter((position) => position.name.includes(search))
            );
            setLoading(false);
        } catch (error) {
            setError(String(error));
            setLoading(false);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        filterPositions(); // Call your filter function
    };

    return (
        <Container className="mt-3">
            <h1 className="display-3 text-center ">All Positions</h1>
            <Form className="d-flex mb-3" onSubmit={handleSubmit}>
                <Form.Control
                    type="search"
                    name="search"
                    placeholder="Search"
                    aria-label="search"
                    className="me-2"
                    value={search}
                    onChange={handleSearchChange}
                />
                <Button variant="outline-success" type="submit">
                    Search
                </Button>
            </Form>
            {loading ? (
                <BasicSpinner />
            ) : (
                <>
                    {error && <Error error={error}></Error>}
                    {positions.length === 0 && (
                        <p className="text-center">
                            There are no positions available
                        </p>
                    )}
                    <ListGroup>
                        {positions.map((position) => (
                            <ListGroup.Item
                                action
                                as={Link}
                                to={`/positions/${position.id}`}
                                className="d-flex justify-content-between align-items-center"
                                key={position.id}
                            >
                                {position.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </>
            )}
        </Container>
    );
}

export default Position_List;
