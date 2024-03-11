import axios from "axios";

import Confirmation from "../interfaces/Confirmation";
import authHeader from "../services/header.auth.service";

const instance = axios.create({
    baseURL: "http://localhost:80/",
    headers: authHeader(),
});

export async function get<Type>(path: string): Promise<Type> {
    try {
        return (await instance.get(path)).data.data;
    } catch (err) {
        throw new Error(String(err));
    }
}

export async function post<Type>(prop: Type, path: string, id: string | null = null): Promise<Type> {
    return (
        await instance.post(
            id !== null ? `${path}/update/${id}` : `${path}/create`,
            { data: prop }
        )
    ).data.data;
}

export async function remove(prop: Confirmation, path: string, id: string) {
    await instance.post(`${path}/delete/${id}`, { data: prop });
}
