import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import authService from "./services/auth.service";
import { AuthContext } from "./services/provider.auth.service";
import Router from "./Routes";

import Navigation from "./components/Navigation";

function App() {
    const queryClient = new QueryClient();
    return (
        <AuthContext.Provider value={authService}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Navigation />
                    <Router />
                </BrowserRouter>
            </QueryClientProvider>
        </AuthContext.Provider>
    );
}

export default App;
