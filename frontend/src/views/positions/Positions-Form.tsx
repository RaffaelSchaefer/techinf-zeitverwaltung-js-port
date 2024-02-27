import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import { get, post } from "../../util/api";
import { FormProps } from "../../interfaces/From";
import { PositionDetail } from "../../interfaces/Position";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";

import { Container, Form, Button } from "react-bootstrap";

const Position_Form: React.FC<FormProps> = ({ update = false }) => {
    const { id } = useParams<{ id: string }>();
    const redirect = useNavigate();

    const [position, setPosition] = useState<PositionDetail>({
        id: -1,
        name: "",
        Users: [],
    });

    const { data, isLoading, error } = useQuery({
        queryFn: async () => {
            const responseData: PositionDetail = update
                ? await get(`positions/${id}`)
                : { id: -1, name: "", Users: [] };
            return responseData;
        },
        queryKey: ["position", id],
    });

    useEffect(() => {
        if (data) {
            setPosition(data);
        }
    }, [data]);

    const sendPosition = useMutation({
        mutationFn: async () => {
            const response = await post(
                position,
                "positions",
                update ? id : null
            );
            return response;
        },
        onSuccess: (data: PositionDetail) => {
            redirect(`/positions/${data?.id}`);
        }
    });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPosition({ ...position, name: e.target.value });
    };

    if (isLoading) return <BasicSpinner />;
    if (error) return <Error error={String(error)} />;

    return (
        <Container className="mt-3">
            <h1 className="display-5">
                {update ? "Update position" : "Create new position"}
            </h1>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendPosition.mutate();
                }}
            >
                <Form.Label htmlFor="name">Position name</Form.Label>
                <Form.Control
                    type="text"
                    id="name"
                    placeholder="Enter position name"
                    required
                    value={position?.name}
                    onChange={handleNameChange}
                />
                <Button variant="primary" className="mt-3" type="submit">
                    {update ? "Update position" : "Create new position"}
                </Button>
            </Form>
        </Container>
    );
};

export default Position_Form;
