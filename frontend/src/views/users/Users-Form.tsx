import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

import { get, post } from "../../util/api";
import { FormProps } from "../../interfaces/From";
import { UserDetail } from "../../interfaces/User";

import Error from "../../components/Error";
import BasicSpinner from "../../components/Spinner";
import Position from "../../interfaces/Position";

const User_Form: React.FC<FormProps> = ({ update = false }) => {
    const { id } = useParams<{ id: string }>();
    const redirect = useNavigate();

    const initialUserState: UserDetail = {
        id: -1,
        first_name: "",
        last_name: "",
        status: false,
        positionId: -1,
        Addresses: [
            {
                id: -1,
                street_name: "",
                house_number: "",
                town_name: "",
                postal_code: "",
                country: "",
                userId: "",
            },
        ],
        Logs: [],
        Cards: [],
        Position: { id: -1, name: "" },
    };

    const [user, setUser] = useState<UserDetail>(initialUserState);

    const { data: positions } = useQuery({
        queryFn: async () => {
            const responseData: Position[] = await get(`positions`);
            return responseData;
        },
        queryKey: ["positions"],
    });

    const { data, isLoading, error } = useQuery({
        queryFn: async () => {
            const responseData: UserDetail = update
                ? await get(`users/${id}`)
                : initialUserState;
            if (responseData.Addresses.length === 0) {
                responseData.Addresses[0] = {
                    id: -1,
                    street_name: "",
                    house_number: "",
                    town_name: "",
                    postal_code: "",
                    country: "",
                    userId: -1,
                };
            }
            return responseData;
        },
        queryKey: ["user", id],
        enabled: !!positions,
    });

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data]);

    const sendUser = useMutation({
        mutationFn: async () => {
            const userResponse = await post(user, "users", update ? id : null);
            user.Addresses[0].userId = user.id;
            console.log(user.Addresses[0]);
            await post(
                user.Addresses[0],
                "address",
                update && user.Addresses[0].id !== -1
                    ? String(user.Addresses[0].id)
                    : null
            );
            return userResponse;
        },
        onSuccess: (data: UserDetail) => {
            redirect(`/users/${data?.id}`);
        },
        onError: (error: Error) => {
            console.error(error);
        }
    });

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, first_name: e.target.value });
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, last_name: e.target.value });
    };

    const handleAddressChange = (e: React.ChangeEvent<any>, field: string) => {
        setUser({
            ...user,
            Addresses: [
                {
                    ...user.Addresses[0],
                    [field]: e.target.value,
                },
            ],
        });
    };

    const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUser({ ...user, positionId: parseInt(e.target.value) });
    };

    if (isLoading) return <BasicSpinner />;
    if (error) return <Error error={String(error)} />;

    return (
        <Container className="mt-3">
            <h1 className="display-5">
                {update ? "Update user" : "Create new user"}
            </h1>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendUser.mutate();
                }}
            >
                <Form.Label htmlFor="first_name">First name</Form.Label>
                <Form.Control
                    type="text"
                    id="first_name"
                    placeholder="Enter first name"
                    value={user.first_name}
                    onChange={handleFirstNameChange}
                    required
                />
                <br />
                <Form.Label htmlFor="last_name">Last name</Form.Label>
                <Form.Control
                    type="text"
                    id="last_name"
                    placeholder="Enter last name"
                    value={user.last_name}
                    onChange={handleLastNameChange}
                    required
                />
                <br />
                {user.Addresses[0] && (
                    <>
                        <Form.Label htmlFor="street_name">
                            Street name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="street_name"
                            placeholder="Enter street name"
                            value={user.Addresses[0].street_name}
                            onChange={(e) =>
                                handleAddressChange(e, "street_name")
                            }
                            required
                        />
                        <br />
                        <Form.Label htmlFor="house_number">
                            House number
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="house_number"
                            placeholder="Enter house number"
                            value={user.Addresses[0].house_number}
                            onChange={(e) =>
                                handleAddressChange(e, "house_number")
                            }
                            required
                        />
                        <br />
                        <Form.Label htmlFor="town_name">Town name</Form.Label>
                        <Form.Control
                            type="text"
                            id="town_name"
                            placeholder="Enter town name"
                            value={user.Addresses[0].town_name}
                            onChange={(e) =>
                                handleAddressChange(e, "town_name")
                            }
                            required
                        />
                        <br />
                        <Form.Label htmlFor="postal_code">
                            Postal code
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="postal_code"
                            placeholder="Enter postal code"
                            value={user.Addresses[0].postal_code}
                            onChange={(e) =>
                                handleAddressChange(e, "postal_code")
                            }
                            required
                        />
                        <br />
                        <Form.Label htmlFor="country">Country</Form.Label>
                        <Form.Control
                            type="text"
                            id="country"
                            placeholder="Enter country"
                            value={user.Addresses[0].country}
                            onChange={(e) => handleAddressChange(e, "country")}
                            required
                        />
                        <br />
                    </>
                )}
                <Form.Label htmlFor="position">Position</Form.Label>
                <Form.Select
                    id="position"
                    aria-describedby="positionHelp"
                    required
                    value={user.positionId}
                    onChange={handlePositionChange}
                >
                    {positions?.map((position) => (
                        <option key={position.id} value={position.id}>
                            {position.name}
                        </option>
                    ))}
                </Form.Select>
                <Form.Text id="positionHelp">
                    If the position is missing, please add it
                    <Link
                        to="/positions/create"
                        className="ms-1 fw-bold text-decoration-none"
                    >
                        here
                    </Link>
                </Form.Text>
                <br />
                <Button variant="primary" className="my-3" type="submit">
                    {update ? "Update user" : "Create user"}
                </Button>
            </Form>
        </Container>
    );
};

export default User_Form;
