import { useContext, useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { AuthContext } from "./services/provider.auth.service";

import Home from "./views/Home";
import NotFound from "./views/NotFound";
import User_List from "./views/users/Users-List";
import User_Detail from "./views/users/Users-Detail";
import User_Form from "./views/users/Users-Form";
import User_Delete from "./views/users/User-Delete";
import Cards_List from "./views/cards/Cards-List";
import Card_Detail from "./views/cards/Cards-Detail";
import Card_Form from "./views/cards/Cards-Form";
import Card_Delete from "./views/cards/Card-Delete";
import Grant_Ownership from "./views/Grant-Ownership";
import Remove_Ownership from "./views/Remove-Ownership";
import Position_List from "./views/positions/Positions-List";
import Position_Detail from "./views/positions/Positions-Detail";
import Position_Form from "./views/positions/Positions-Form";
import Position_Delete from "./views/positions/Positions-Delete";
import Register from "./views/login/Register";
import Login from "./views/login/Login";

function Router() {

    const auth = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(!!auth?.status);

    useEffect(() => {
        setIsAuthenticated(!!auth?.status);
    }, [auth?.status]);

    function renderRoutes() {
    
        if (!isAuthenticated) return (
            <>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
            </>
        )
    
        return (
            <>
                <Route index element={<Home />} />
                <Route path="users" element={<Outlet />}>
                    <Route index element={<User_List />} />
                    <Route path=":id" element={<User_Detail />} />
                    <Route path="create" element={<User_Form />} />
                    <Route path="update/:id" element={<User_Form update />} />
                    <Route path="delete/:id" element={<User_Delete />} />
                </Route>
                <Route path="cards" element={<Outlet />}>
                    <Route index element={<Cards_List />} />
                    <Route path=":uid" element={<Card_Detail />} />
                    <Route path="create" element={<Card_Form />} />
                    <Route path="update/:uid" element={<Card_Form update />} />
                    <Route path="delete/:uid" element={<Card_Delete />} />
                </Route>
                <Route path="positions" element={<Outlet />}>
                    <Route index element={<Position_List />} />
                    <Route path=":id" element={<Position_Detail />} />
                    <Route path="create" element={<Position_Form />} />
                    <Route path="update/:id" element={<Position_Form update />} />
                    <Route path="delete/:id" element={<Position_Delete />} />
                </Route>
                <Route path="remove-ownership/:uid" element={<Remove_Ownership />} />
                <Route path="grant-ownership" element={<Grant_Ownership />} />
            </>
        ) 
    
    }

    return (
        <Routes>
            {renderRoutes()}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Router;
