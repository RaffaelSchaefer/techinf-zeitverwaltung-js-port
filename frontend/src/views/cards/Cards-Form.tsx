import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import { get, post } from "../../util/api";
import { FormProps } from "../../interfaces/From";
import { CardDetail } from "../../interfaces/Card";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

import { Container, Form, Button } from "react-bootstrap";

const Card_Form: React.FC<FormProps> = ({ update = false }) => {
    const { uid } = useParams<{ uid: string }>();
    const redirect = useNavigate();

    const [card, setCard] = useState<CardDetail>({ uid: "", userId: null, User: null, Logs: [] });

    const { data, isLoading, error } = useQuery({
        queryFn: async () => {
            const responseData: CardDetail = update
                ? await get(`cards/${uid}`)
                : { uid: "", userId: null, User: null, Logs: [] };
            return responseData;
        },
        queryKey: ["card", uid],
    });

    useEffect(() => {
        if (data) {
            setCard(data)
        }
    }, [data]);

    const sendCard = useMutation({
        mutationFn: async () => {
            const response = await post(
                card,
                "cards",
                update ? uid : null
            );
            return response;
        },
        onSuccess: (data: CardDetail) => {
            redirect(`/cards/${data?.uid}`);
        }
    });

    const handleUIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCard({ ...card, uid: e.target.value });
    };

    if (isLoading) return <BasicSpinner />;
    if (error) return <Error error={String(error)} />;

    return (
        <Container className="mt-3">
            <h1 className="display-5">
                {update ? "Update card" : "Register a new card"}
            </h1>
            <Form onSubmit={(e) => {
                e.preventDefault();
                sendCard.mutate();
            }}>
                <Form.Label htmlFor="uid">Card UID</Form.Label>
                <Form.Control
                    type="text"
                    id="uid"
                    name="uid"
                    placeholder="Enter card UID"
                    required
                    value={card?.uid}
                    onChange={handleUIDChange}
                />
                <Form.Text>
                    The UID is the unique identifier of your Card
                </Form.Text>
                <br />
                <Button variant="primary" className="mt-3" type="submit">
                    {update ? "Update card" : "Register card"}
                </Button>
            </Form>
        </Container>
    );
};

export default Card_Form;
