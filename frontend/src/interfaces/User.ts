import Address from "./Address"
import Card from "./Card"
import Log from "./Log"
import Position from "./Position"

export default interface User {
    id: number,
    first_name: string,
    last_name: string,
    status: boolean,
    positionId: number
}

export interface UserDetail extends User {
    Position: Position,
    Addresses: Address[],
    Logs: Log[],
    Cards: Card[]
}
