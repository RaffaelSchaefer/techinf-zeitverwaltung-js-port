import axios from "axios";

import Confirmation from "../interfaces/Confirmation";
import authHeader from "../services/header.auth.service";

export async function get<Type>(path: string): Promise<Type> {
    const url = `http://localhost:80/${path}`;
    try {
        return (await axios.get(url, {headers: authHeader()})).data.data;
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
        { data: prop, headers: authHeader()}
    )).data.data;
}

//FIXME Fix Prop
export async function remove(prop: Confirmation, path: string, id: string){
    await axios.post(`http://localhost:80/${path}/delete/${id}`, { data: prop, headers: authHeader() });
}
