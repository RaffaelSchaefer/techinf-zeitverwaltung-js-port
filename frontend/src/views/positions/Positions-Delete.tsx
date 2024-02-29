import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";

import { get, remove } from "../../util/api";
import { PositionDetail } from "../../interfaces/Position";
import { defaultConfirmation } from "../../interfaces/Confirmation";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";
import Confirm from "../Confirm";

import { Container, ListGroup } from "react-bootstrap";

const Position_Delete = () => {
    const { id } = useParams<{ id: string }>();
    const redirect = useNavigate();

    const [position, setPosition] = useState<PositionDetail>({
        id: -1,
        name: "",
        Users: [],
    });

    const { data, isLoading, error } = useQuery({
        queryFn: async () => {
            const responseData: PositionDetail = await get(`positions/${id}`);
            return responseData;
        },
        queryKey: ["position", id],
    });

    useEffect(() => {
        if (data) {
            setPosition(data);
        }
    }, [data]);

    const sendConfirmation = useMutation({
        mutationFn: async () => {
            await remove(defaultConfirmation, `positions`, String(id));
        },
        onSuccess: () => {
            redirect(`/positions`);
        },
        onError: (error: Error) => {
            console.error(error);
        },
    });

    if (isLoading) return <BasicSpinner />;
    if (error) return <Error error={String(error)} />;

    return (
        <>
            {position.Users?.length > 0 && (
                <Container className="mt-3">
                    <h1 className="display-5">Delete Position?</h1>
                    <p>
                        Sorry, but you are not able to delete the position
                        because there are still users assigned to the position.
                    </p>
                    <ListGroup>
                        {position.Users.map((user) => (
                            <ListGroup.Item
                                action
                                as={Link}
                                to={`/users/${user.id}`}
                                key={user.id}
                            >
                                {user.first_name} {user.last_name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Container>
            )}
            {!position.Users?.length && (
                <Confirm
                    onSuccess={() => {
                        sendConfirmation.mutate();
                    }}
                    onFailure={() => {
                        redirect(`/positions/${id}`);
                    }}
                    title="Delete Position?"
                />
            )}
        </>
    );
};

export default Position_Delete;
