import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { CardDetail } from "../../interfaces/Card";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

function Card_Detail() {
    const [card, setCard] = useState<CardDetail>();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const { uid } = useParams<{ uid: string }>();
    const url = `http://localhost:80/cards/${uid}`;

    useEffect(() => {
        const updatePosition = async () => {
            try {
                const response = await axios.get(url);
                setCard(response.data.data);
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
                    <h1 className="display-6">Card: {card?.uid}</h1>
                    {error && <Error error={error}></Error>}
                    {card?.User && card?.User != null ? (
                        <p>
                            Owner:{" "}
                            <Link to={`/users/${card?.User.id}`}>
                                {card?.User.first_name} {card?.User.last_name}
                            </Link>
                        </p>
                    ) : (
                        <p>This card has no Owner</p>
                    )}
                    <Container className="fixed-bottom pb-3">
                        <Button
                            variant={
                                card?.userId === null ? "success" : "warning"
                            }
                            className="mb-1"
                        >
                            {card?.userId === null
                                ? "Grant card ownership"
                                : "Remove card ownership"}
                        </Button>
                        <Link to={`/cards/update/${card?.uid}`}>
                            <Button variant="primary" className="ms-1 mb-1">
                                Update Card
                            </Button>
                        </Link>
                        <Button variant="danger" className="ms-1 mb-13">
                            Remove Card
                        </Button>
                    </Container>
                </>
            )}
        </Container>
    );
}

export default Card_Detail;
