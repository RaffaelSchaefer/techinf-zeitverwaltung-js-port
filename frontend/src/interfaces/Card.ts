import Log from "./Log"
import User from "./User"

export default interface Card {
    uid: string,
    userId: number
}

export interface CardDetail extends Card {
    User: User,
    Logs: Log[]
}
