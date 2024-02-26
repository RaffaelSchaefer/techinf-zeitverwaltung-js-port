import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { get } from "../../util/api";
import { CardDetail } from "../../interfaces/Card";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

function Card_Detail() {
    const { uid } = useParams<{ uid: string }>();
    
    const {
        data: card,
        isLoading,
        error,
    } = useQuery({
        queryFn: async () => {
            const card: CardDetail = await get(`cards/${uid}`);
            return card;
        },
        queryKey: ["card"],
    });

    if (isLoading) return <BasicSpinner />;
    if (error) return <Error error={String(error)} />;

    return (
        <Container className="mt-3">
            <h1 className="display-6">Card: {card?.uid}</h1>
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
                    variant={card?.userId === null ? "success" : "warning"}
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
        </Container>
    );
}

export default Card_Detail;
