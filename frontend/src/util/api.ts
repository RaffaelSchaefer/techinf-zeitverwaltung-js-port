import axios from "axios";

export async function get<Type>(path: string): Promise<Type> {
    const url = `http://localhost:80/${path}`;
    try {
        return (await axios.get(url)).data.data;
    } catch (err) {
        throw new Error(String(err));
    }
}
