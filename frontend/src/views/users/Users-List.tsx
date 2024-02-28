import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { get } from "../../util/api";
import User from "../../interfaces/User";

import Error from "../../components/Error";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import BasicSpinner from "../../components/Spinner";

function Users_List() {
    const [search, setSearch] = useState<string>("");

    const {
        data: users,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryFn: async () => {
            const users: User[] = await get("users");
            return users.filter((user) => {
                const full_name = `${user.first_name} ${user.last_name}`;
                return full_name.includes(search);
            });
        },
        queryKey: ["users"],
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        refetch();
    };

    if (isLoading) return <BasicSpinner />;
    if (error) return <Error error={String(error)} />;

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
            {users?.length === 0 ? (
                <p className="text-center">There are no users available</p>
            ) : (
                <ListGroup>
                    {users?.map((user) => (
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
            )}
            <Container className="fixed-bottom pb-3">
                <Link to="/users/create">
                    <Button variant="primary">Create new card</Button>
                </Link>
            </Container>
        </Container>
    );
}

export default Users_List;
