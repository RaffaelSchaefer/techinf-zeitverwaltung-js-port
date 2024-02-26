import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { FormProps } from "../../interfaces/From";
import { CardDetail } from "../../interfaces/Card";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

import { Container, Form, Button } from "react-bootstrap";

const Card_Form: React.FC<FormProps> = ({ update = false }) => {
    const [card, setCard] = useState<CardDetail>({
        uid: "",
        userId: null,
        User: null,
        Logs: [],
    });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(update);
    const { uid } = useParams<{ uid: string }>();
    const url = `http://localhost:80/cards/${uid}`;
    const redirect = useNavigate();

    useEffect(() => {
        const updateCard = async () => {
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
        if (update) {
            updateCard();
        }
    }, [url]);

    const handleUIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCard({ ...card, uid: e.target.value });
    };

    const sendUID = async () => {
        try {
            if (card?.uid === "") {
                throw new globalThis.Error("Card uid can not be empty");
            }
            const response = await axios.post(
                update
                    ? `http://localhost:80/cards/update/${uid}`
                    : "http://localhost:80/cards/create",
                { data: card }
            );
            redirect(`/cards/${response.data.data?.uid}`);
        } catch (error) {
            setError(String(error));
        }
    };

    return (
        <Container className="mt-3">
            {loading ? (
                <BasicSpinner />
            ) : (
                <>
                    <h1 className="display-5">
                        {update ? "Update card" : "Register a new card"}
                    </h1>
                    {error && <Error error={error}></Error>}
                    <Form>
                        <Form.Label for="uid">Card UID</Form.Label>
                        <Form.Control
                            type="text"
                            id="uid"
                            name="uid"
                            placeholder="Enter card UID"
                            required
                            value={card?.uid}
                            onChange={handleUIDChange}
                        ></Form.Control>
                        <Form.Text>
                            The UID is the unique identifier of your Card
                        </Form.Text>
                        <br/>
                        <Button
                            variant="primary"
                            className="mt-3"
                            onClick={sendUID}
                        >
                            {update ? "Update card" : "Register card"}
                        </Button>
                    </Form>
                </>
            )}
        </Container>
    );
};

export default Card_Form;
