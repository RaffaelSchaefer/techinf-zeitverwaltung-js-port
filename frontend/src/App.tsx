import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./views/Home";

import Navigation from "./components/Navigation";
import NotFound from "./views/NotFound";

function App() {
    return (
        <>
            <Navigation />
            <Router>
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="*" Component={NotFound} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
