import { createContext } from "react";

import authService from "./auth.service";

export const AuthContext = createContext(authService);
