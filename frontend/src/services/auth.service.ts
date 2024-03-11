import axios from "axios";

const url = "http://localhost:80";

export class AuthService {

    async login(name: string, password: string) {
        const response = await axios.post(`${url}/login`, {
            data: {
                name: name,
                password: password,
            },
        });
        localStorage.setItem("token", response.data.data.token);
    }

    logout() {
        localStorage.removeItem("token");
    }

    async register(name: string, email: string, password: string) {
        return await axios.post(`${url}/register`, {
            data: {
                name: name,
                email: email,
                password: password,
            },
        });
    }

    get token() {
        return localStorage.getItem("token");
    }

    get status() {
        return localStorage.getItem("token") !== null ? true : false;
    }
}

export default new AuthService();
