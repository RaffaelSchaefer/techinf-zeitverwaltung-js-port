import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { FormProps } from "../../interfaces/From";
import { PositionDetail } from "../../interfaces/Position";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

import { Container, Form, Button } from "react-bootstrap";

const Position_Form: React.FC<FormProps> = ({ update = false }) => {
    const [position, setPosition] = useState<PositionDetail>({
        name: "",
        id: -1,
        Users: [],
    });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(update);
    const { id } = useParams<{ id: string }>();
    const url = `http://localhost:80/positions/${id}`;
    const redirect = useNavigate();

    useEffect(() => {
        const updatePosition = async () => {
            try {
                const response = await axios.get(url);
                setPosition(response.data.data);
                setError(response.data.error);
                setLoading(false);
            } catch (error) {
                setError(String(error));
                setLoading(false);
            }
        };
        if (update) {
            updatePosition();
        }
    }, [url]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPosition({ ...position, name: e.target.value });
    };

    const sendPosition = async () => {
        try {
            if (position?.name === "") {
                throw new globalThis.Error("Position Name can not be empty");
            }
            const response = await axios.post(
                update
                    ? `http://localhost:80/positions/update/${position?.id}`
                    : "http://localhost:80/positions/create",
                { data: position }
            );
            redirect(`/positions/${response.data.data?.id}`);
        } catch (error) {
            setError(String(error));
            error;
        }
    };

    return (
        <Container className="mt-3">
            {loading ? (
                <BasicSpinner />
            ) : (
                <>
                    <h1 className="display-5">Create new position</h1>
                    {error && <Error error={error}></Error>}
                    <Form>
                        <Form.Label for="name">Position name</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter position name"
                            required
                            value={position?.name}
                            onChange={handleNameChange}
                        ></Form.Control>
                        <Button
                            variant="primary"
                            className="mt-3"
                            onClick={sendPosition}
                        >
                            {update ? "Update position" : "Create new position"}
                        </Button>
                    </Form>
                </>
            )}
        </Container>
    );
};

export default Position_Form;
