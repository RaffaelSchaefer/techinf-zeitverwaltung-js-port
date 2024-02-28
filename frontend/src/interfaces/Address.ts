import User from "./User"

export default interface Address {
    id: number,
    street_name: string,
    house_number: string,
    town_name: string,
    postal_code: string,
    country: string,
    userId: number
}

export interface AddressDetail extends Address {
    User: User
}
