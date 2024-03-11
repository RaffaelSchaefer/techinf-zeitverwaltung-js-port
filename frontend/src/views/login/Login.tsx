import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, InputGroup } from "react-bootstrap";

import Admin from "../../interfaces/Admin";

import Error from "../../components/Error";
import { AuthContext } from "../../services/provider.auth.service";

const Login = () => {
    const redirect = useNavigate();
    const auth = useContext(AuthContext);
    const [admin, setAdmin] = useState<Admin>({name: "", email: "", password: ""});
    const [error, setError] = useState<string>("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdmin({ ...admin, name: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdmin({ ...admin, password: e.target.value });
    };

    const login = useMutation({
        mutationFn: async () => {
            auth.login(admin.name, admin.password);
        },
        onSuccess: () => {
            setTimeout(() => {
                redirect(`/`);
            }, 1000);
        },
        onError: (error: Error) => {
            setError(error.message);
        }
    });

    return (
        <Container>
            <h1 className="mt-3 text-center">Login</h1>
            {error && <Error error={error} />}
            <Form onSubmit={(e) => {
                e.preventDefault();
                login.mutate();
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
                <Form.Text className="text-muted">If you don't have an account please register<Link to="/register" className="ms-1 fw-bold text-decoration-none">here</Link></Form.Text>
                <br/>
                <Button type="submit" className="mt-3">Login</Button>
            </Form>
        </Container>
    );
};

export default Login;
