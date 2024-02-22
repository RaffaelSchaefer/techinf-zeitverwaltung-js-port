import User from "./User"

export default interface Position {
    id: number,
    name: string
}

export interface PositionDetail extends Position {
    Users: User[]
}
