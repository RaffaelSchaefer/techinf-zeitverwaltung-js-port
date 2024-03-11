import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../services/provider.auth.service";

const PrivateRoute = () => {
    const auth = useContext(AuthContext);
    if (!auth.status) return <Navigate to="/login" />;
    return <Outlet />;
};

export default PrivateRoute;
