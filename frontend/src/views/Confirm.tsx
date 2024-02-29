import React from "react";

import { Container, Button } from "react-bootstrap";

interface ConfirmProps {
    onSuccess: () => void;
    onFailure: () => void;
    title: string;
}

const Confirm: React.FC<ConfirmProps> = ({
    onSuccess,
    onFailure,
    title = "Do you want to take this action?",
}) => {
    return (
        <Container className="mt-3">
            <h1 className="display-5">{title}</h1>
            <p>Caution! This action is irreversible.</p>
            <br />
            <Button
                variant="success"
                onClick={() => {
                    onFailure();
                }}
            >
                No
            </Button>
            <Button
                variant="danger"
                className="ms-3"
                onClick={() => {
                    onSuccess();
                }}
            >
                Yes
            </Button>
        </Container>
    );
};

export default Confirm;
