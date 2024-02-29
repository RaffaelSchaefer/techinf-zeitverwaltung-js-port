import { useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import { remove } from "../../util/api";

import Confirm from "../Confirm";
import { defaultConfirmation } from "../../interfaces/Confirmation";

const Card_Delete = () => {
    const { uid } = useParams<{ uid: string }>();
    const redirect = useNavigate();

    const sendConfirmation = useMutation({
        mutationFn: async () => {
            await remove(defaultConfirmation, `cards`, String(uid));
        },
        onSuccess: () => {
            redirect(`/cards`);
        },
        onError: (error: Error) => {
            console.error(error);
        }
    });


    return <Confirm onSuccess={() => sendConfirmation.mutate()} onFailure={() => redirect("/cards")} title="Delete Card?" />
};

export default Card_Delete;
