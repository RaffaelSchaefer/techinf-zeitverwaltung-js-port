import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

import { get } from "../../util/api";
import Card from "../../interfaces/Card";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

function Cards_List() {
    const [search, setSearch] = useState<string>("");
    
    const {
        data: cards,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryFn: async () => {
            const cards: Card[] = await get("cards");
            return cards.filter(
                (card) => card.uid && card.uid.includes(search)
            );
        },
        queryKey: ["cards"],
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
            <h1 className="display-3 text-center ">All Cards</h1>
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
            {cards?.length === 0 ? (
                <p className="text-center">There are no cards available</p>
            ) : (
                <ListGroup>
                    {cards?.map((card) => (
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
            )}
            <Container className="fixed-bottom pb-3">
                <Link to="/cards/create">
                    <Button variant="primary">Register a new card</Button>
                </Link>
            </Container>
        </Container>
    );
}

export default Cards_List;
