import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import NotFound from "./views/NotFound";

import User_List from "./views/users/Users-List";
import User_Detail from "./views/users/Users-Detail";
import User_Form from "./views/users/Users-Form"
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

import Navigation from "./components/Navigation";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Navigation />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="users" element={<User_List />} />
                    <Route path="users/:id" element={<User_Detail />} />
                    <Route path="users/create" element={<User_Form />} />
                    <Route path="users/update/:id" element={<User_Form update />} />
                    <Route path="user/delete/:id" element={<User_Delete />} />
                    <Route path="cards" element={<Cards_List />} />
                    <Route path="cards/:uid" element={<Card_Detail />} />
                    <Route path="cards/create" element={<Card_Form />} />
                    <Route path="cards/update/:uid" element={<Card_Form update />} />
                    <Route path="cards/delete/:uid" element={<Card_Delete />} />
                    <Route path="remove-ownership/:uid" element={<Remove_Ownership />} />
                    <Route path="grant-ownership" element={<Grant_Ownership />} />
                    <Route path="positions" element={<Position_List />} />
                    <Route path="positions/:id" element={<Position_Detail />} />
                    <Route path="positions/create" element={<Position_Form />} />
                    <Route path="positions/update/:id" element={<Position_Form update />} />
                    <Route path="positions/delete/:id" element={<Position_Delete />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
