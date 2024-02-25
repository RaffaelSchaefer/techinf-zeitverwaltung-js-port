import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function BasicSpinner() {
    return (
        <Container className="mt-5 d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status" variant="secondary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );
}

export default BasicSpinner;
