import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Navbar, Nav, Container } from "react-bootstrap";

import { AuthContext } from "../services/provider.auth.service";

function Navigation() {
    const redirect = useNavigate();
    const auth = useContext(AuthContext);

    const logout = useMutation({
        mutationFn: async () => {
            auth.logout();
        },
        onSuccess: () => {
            setTimeout(() => {
                redirect(`/login`);
            }, 100);
        }
    });

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand className="mb-0 h1">Zeitverwaltung</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
                        <Nav.Link as={NavLink} to="/cards">Cards</Nav.Link>
                        <Nav.Link as={NavLink} to="/positions">Positions</Nav.Link>
                        {auth.status && <Button variant="outline-danger" onClick={() => {logout.mutate()}}>Logout</Button>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
