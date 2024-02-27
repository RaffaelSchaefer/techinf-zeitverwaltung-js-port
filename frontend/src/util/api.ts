import axios from "axios";

export async function get<Type>(path: string): Promise<Type> {
    const url = `http://localhost:80/${path}`;
    try {
        return (await axios.get(url)).data.data;
    } catch (err) {
        throw new Error(String(err));
    }
}

export async function post<Type>(prop: Type, path: string, id: string | null = null): Promise<Type> {
    const url = `http://localhost:80/${path}`;
    return (await axios.post(
        id !== null
            ? `${url}/update/${id}`
            : `${url}/create`,
        { data: prop }
    )).data.data;
}
