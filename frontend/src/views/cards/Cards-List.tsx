import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Container  from "react-bootstrap/Container";

import Card from "../../interfaces/Card";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

function Cards_List() {
    const [cards, setCards] = useState<Card[]>([]);
    const [search, setSearch] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const url = "http://localhost:80/cards";

    useEffect(() => {
        updateCards();
    }, []);

    const updateCards = async () => {
        try {
            const response = await axios.get(url);
            setCards(response.data.data);
            setError(response.data.error);
            setLoading(false);
        } catch (error) {
            setError(String(error));
            setLoading(false);
        }
    };

    const filterCards = async () => {
        try {
            setLoading(true);
            const response: Card[] = await (await axios.get(url)).data.data;
            setCards(response.filter((card) => card.uid.includes(search)));
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
        filterCards(); // Call your filter function
    };

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
            {loading ? (
                <BasicSpinner />
            ) : (
                <>
                    {error && <Error error={error}></Error>}
                    {cards.length === 0 ? (
                        <p className="text-center">
                            There are no cards available
                        </p>
                    ) : (
                        <ListGroup>
                            {cards.map((card) => (
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
                </>
            )}
        </Container>
    );
}

export default Cards_List;
