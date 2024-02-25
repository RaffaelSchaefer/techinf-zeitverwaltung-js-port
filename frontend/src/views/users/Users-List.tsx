import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

import User from "../../interfaces/User";

import Error from "../../components/Error";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import BasicSpinner from "../../components/Spinner";

function Users_List() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const url = "http://localhost:80/users";

    useEffect(() => {
        updateUsers();
    }, []);

    const updateUsers = async () => {
        try {
            const response = await axios.get(url);
            setUsers(response.data.data);
            setError(response.data.error);
            setLoading(false);
        } catch (error) {
            setError(String(error));
            setLoading(false);
        }
    };

    const filterUsers = async () => {
        try {
            setLoading(true);
            const response: User[] = await (await axios.get(url)).data.data;
            setUsers(
                response.filter((user) =>
                    `${user.first_name} ${user.last_name}`.includes(search)
                )
            );
            setLoading(false)
        } catch (error) {
            setError(String(error));
            setLoading(false)
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        filterUsers(); // Call your filter function
    };

    return (
        <Container className="mt-3">
            <h1 className="display-3 text-center ">All Users</h1>
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
                    {users.length === 0 && (
                        <p className="text-center">
                            There are no users available
                        </p>
                    )}
                    <ListGroup>
                        {users.map((user) => (
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
                </>
            )}
        </Container>
    );
}

export default Users_List;
