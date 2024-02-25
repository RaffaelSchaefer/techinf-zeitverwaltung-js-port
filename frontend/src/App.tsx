import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import NotFound from "./views/NotFound";

import User_List from "./views/users/Users-List";
import User_Detail from "./views/users/Users-Detail";
import Cards_List from "./views/cards/Cards-List";
import Position_List from "./views/positions/Positions-List";
import Position_Detail from "./views/positions/Positions-Detail";

import Navigation from "./components/Navigation";

function App() {
    return (
            <Router>
            <Navigation />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="users" element={<User_List />} />
                    <Route path="users/:id" element={<User_Detail />} />
                    <Route path="cards" element={<Cards_List />} />
                    <Route path="positions" element={<Position_List />} />
                    <Route path="positions/:id" element={<Position_Detail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
    );
}

export default App;
