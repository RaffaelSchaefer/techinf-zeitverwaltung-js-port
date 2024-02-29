import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

import { get, post } from "../util/api";
import User from "../interfaces/User";
import Card, { CardDetail } from "../interfaces/Card";

import Error from "../components/Error";
import BasicSpinner from "../components/Spinner";

const Grant_Ownership = () => {
    const redirect = useNavigate();

    const [userId, setUserId] = useState<number>(0);
    const [cardUid, setCardUid] = useState<string>("");

    const {
        data: users,
        isLoading: isLoadingUsers,
        error: errorUsers,
    } = useQuery({
        queryFn: async () => {
            const responseData: User[] = await get(`users`);
            return responseData;
        },
        queryKey: ["users"],
    });

    const {
        data: cards,
        isLoading: isLoadingCards,
        error: errorCards,
    } = useQuery({
        queryFn: async () => {
            const responseData: Card[] = await get(`cards`);
            const unusedCards = responseData.filter(
                (card) => card.userId === null
            );
            return unusedCards;
        },
        queryKey: ["cards"],
    });

    useEffect(() => {
        if (users && users.length > 0) {
            setUserId(users[0].id);
        }
        if (cards && cards.length > 0) {
            setCardUid(cards[0].uid);
        }
    }, [users, cards]);

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserId(Number(e.target.value));
    };

    const handleCardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCardUid(e.target.value);
    };

    const sendOwnership = useMutation({
        mutationFn: async () => {
            const card: CardDetail = await get(`cards/${cardUid}`);
            card.userId = userId;
            const cardResponse = await post(card, "cards", card.uid);
            return cardResponse;
        },
        onSuccess: (data: CardDetail) => {
            redirect(`/users/${data?.userId}`);
        },
        onError: (error: Error) => {
            console.error(error);
        },
    });

    if (isLoadingUsers && isLoadingCards) return <BasicSpinner />;

    if (errorUsers || errorCards)
        return (
            <>
                {errorCards && <Error error={String(errorUsers)} />}
                {errorCards && <Error error={String(errorCards)} />}
            </>
        );

    if (cards?.length === 0)
        return (
            <Container className="mt-3">
                <p className="text-center">
                    The are no unused cards available, register a new card
                    <Link
                        to="/cards/create"
                        className="ms-1 fw-bold text-decoration-none"
                    >
                        here
                    </Link>
                </p>
            </Container>
        );

    return (
        <Container>
            <h1 className="mt-3">Grant Ownership</h1>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendOwnership.mutate();
                }}
            >
                <Form.Label htmlFor="user">User</Form.Label>
                <Form.Select
                    id="user"
                    value={userId}
                    onChange={handleUserChange}
                    required
                >
                    {users?.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.first_name} {user.last_name}
                        </option>
                    ))}
                </Form.Select>
                <br />
                <Form.Label htmlFor="card">Card</Form.Label>
                <Form.Select
                    id="card"
                    value={cardUid}
                    onChange={handleCardChange}
                    required
                >
                    {cards?.map((card) => (
                        <option key={card.uid} value={card.uid}>
                            {card.uid}
                        </option>
                    ))}
                </Form.Select>
                <br />
                <Button variant="primary" className="my-3" type="submit">
                    Grant Ownership
                </Button>
            </Form>
        </Container>
    );
};

export default Grant_Ownership;
