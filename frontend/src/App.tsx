import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import Router from "./Routes";

import Navigation from "./components/Navigation";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Navigation />
                <Router />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
