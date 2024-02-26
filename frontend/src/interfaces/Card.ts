import Log from "./Log"
import User from "./User"

export default interface Card {
    uid: string,
    userId: number | null
}

export interface CardDetail extends Card {
    User: User | null,
    Logs: Log[]
}
