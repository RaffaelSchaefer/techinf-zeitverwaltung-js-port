import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, InputGroup } from "react-bootstrap";

import Admin from "../../interfaces/Admin";

import Error from "../../components/Error";
import AuthService from "../../services/auth.service";

const Register = () => {
    const redirect = useNavigate();
    const [admin, setAdmin] = useState<Admin>({name: "", email: "", password: ""});
    const [error, setError] = useState<string>("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdmin({ ...admin, name: e.target.value });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdmin({ ...admin, email: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdmin({ ...admin, password: e.target.value });
    };

    const register = useMutation({
        mutationFn: async () => {
            AuthService.register(admin.name, admin.email, admin.password);
        },
        onSuccess: () => {
            redirect(`/login`);
        },
        onError: (error: Error) => {
            setError(error.message);
        }
    });

    return (
        <Container>
            <h1 className="mt-3 text-center">Register</h1>
            {error && <Error error={error} />}
            <Form onSubmit={(e) => {
                e.preventDefault();
                register.mutate();
            }}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Username</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            id="name"
                            value={admin.name}
                            onChange={handleNameChange}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        value={admin.email}
                        onChange={handleEmailChange}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Enter password"
                        value={admin.password}
                        onChange={handlePasswordChange}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 8-20 characters long, contain
                        letters and numbers, and must not contain spaces,
                        special characters, or emoji.
                    </Form.Text>
                </Form.Group>
                <Button type="submit">Register</Button>
            </Form>
        </Container>
    );
};

export default Register;
