import { useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import { remove } from "../../util/api";

import Confirm from "../Confirm";
import { defaultConfirmation } from "../../interfaces/Confirmation";

const User_Delete = () => {
    const { id } = useParams<{ id: string }>();
    const redirect = useNavigate();

    const sendConfirmation = useMutation({
        mutationFn: async () => {
            await remove(defaultConfirmation, `users`, String(id));
        },
        onSuccess: () => {
            redirect(`/users`);
        },
        onError: (error: Error) => {
            console.error(error);
        }
    });


    return <Confirm onSuccess={() => sendConfirmation.mutate()} onFailure={() => redirect("/users")} title="Delete User?" />
};

export default User_Delete;
