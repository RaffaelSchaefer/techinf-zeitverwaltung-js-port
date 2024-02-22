import React from 'react';
import Alert from 'react-bootstrap/Alert';

interface ErrorProps {
    error: string;
    variant?: string;
}

const Error: React.FC<ErrorProps> = ({ error, variant = "danger" }) => {
    return (
        <Alert variant={variant} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
        </Alert>
    );
}

export default Error;
