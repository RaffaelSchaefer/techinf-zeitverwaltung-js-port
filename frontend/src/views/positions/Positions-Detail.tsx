import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { Container, ListGroup, Button } from "react-bootstrap";

import { get } from "../../util/api";
import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";
import { PositionDetail } from "../../interfaces/Position";

function Position_Detail() {
    const { id } = useParams<{ id: string }>();
    
    const {
        data: position,
        isLoading,
        error,
    } = useQuery({
        queryFn: async () => {
            const position: PositionDetail = await get(`positions/${id}`)
            return position
        },
        queryKey: ["position"],
    });

    if (isLoading) return <BasicSpinner />;
    if (error) return <Error error={String(error)} />;

    return (
        <Container className="mt-3">
            <h1 className="display-3 text-center ">{position?.name}</h1>
            <h2 className="h5 my-2">All {position?.name}s</h2>
            {position?.Users && position.Users.length > 0 ? (
                <ListGroup>
                    {position?.Users.map((user) => (
                        <ListGroup.Item
                            action
                            as={Link}
                            to={`/users/${user.id}`}
                            className="d-flex justify-content-between align-items-center"
                            key={user.id}
                        >
                            {user.first_name} {user.last_name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p>There are no Users with this Position</p>
            )}
            <Container className="fixed-bottom pb-3">
                <Link to={`/positions/update/${position?.id}`}>
                    <Button variant="warning" className="mb-1">
                        Update position
                    </Button>
                </Link>
                <Button variant="danger" className="ms-1 mb-1">
                    Remove position
                </Button>
            </Container>
        </Container>
    );
}

export default Position_Detail;
