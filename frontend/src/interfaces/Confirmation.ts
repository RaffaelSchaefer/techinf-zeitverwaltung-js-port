export default interface Confirmation {
    data: {
        confirm: boolean;
    }
}

export const defaultConfirmation: Confirmation = {
    data: {
        confirm: true
    }
}
