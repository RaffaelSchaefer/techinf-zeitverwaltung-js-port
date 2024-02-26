import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

import { get } from "../../util/api";
import Position from "../../interfaces/Position";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

function Position_List() {
    const [search, setSearch] = useState<string>("");
    
    const {
        data: positions,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryFn: async () => {
            const positions: Position[] = await get("positions");
            return positions.filter((position) => position.name && position.name.includes(search));
        },
        queryKey: ["positions"],
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
            {positions?.length === 0 ? (
                <p className="text-center">There are no positions available</p>
            ) : (
                <ListGroup>
                    {positions?.map((position) => (
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
            )}
            <Container className="fixed-bottom pb-3">
                <Link to="/positions/create">
                    <Button variant="primary">Create new position</Button>
                </Link>
            </Container>
        </Container>
    );
}

export default Position_List;
