import "bootstrap-icons/font/bootstrap-icons.css";

import Container from "react-bootstrap/Container";

function NotFound() {
    return (
        <Container className="mt-3 d-flex">
            <i className="bi bi-exclamation-triangle display-1 mx-3 align-self-center d-none d-md-block"></i>
            <div>
                <h1 className="display-3">404 Page not found</h1>
                <p className="lead">
                    The requested URL was not found on this server <br />
                    <a className="w-bold text-decoration-none(" href="/">return to home</a>
                </p>
            </div>
        </Container>
    );
}

export default NotFound;
