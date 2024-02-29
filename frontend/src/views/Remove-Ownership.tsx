import { useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import { get, post } from "../util/api";

import { CardDetail } from "../interfaces/Card";
import Confirm from "./Confirm";

const Card_Delete = () => {
    const { uid } = useParams<{ uid: string }>();
    const redirect = useNavigate();

    const sendConfirmation = useMutation({
        mutationFn: async () => {
            const card: CardDetail = await get(`cards/${uid}`);
            card.userId = null;
            const cardResponse = await post(card, "cards", card.uid);
            return cardResponse;
        },
        onSuccess: (data: CardDetail) => {
            redirect(`/cards/${data?.uid}`);
        },
        onError: (error: Error) => {
            console.error(error);
        },
    });


    return <Confirm onSuccess={() => sendConfirmation.mutate()} onFailure={() => redirect("/cards")} title="Remove Card Ownership?" />
};

export default Card_Delete;
