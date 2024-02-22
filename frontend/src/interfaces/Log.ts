import User from "./User";
import Card from "./Card"

export default interface Log{
    id: number;
    time: string;
    status: string;
    cardUid: string;
    userId: string;
}

export interface LogDetail extends Log{
    User: User
    Card: Card
}
