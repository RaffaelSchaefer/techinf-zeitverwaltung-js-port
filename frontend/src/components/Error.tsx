import React from "react";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

interface ErrorProps {
    error: string;
    variant?: string;
}

const Error: React.FC<ErrorProps> = ({ error, variant = "danger" }) => {
    return (
        <Container className="mt-5">
            <Alert variant={variant}>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{error}</p>
            </Alert>
        </Container>
    );
};

export default Error;
