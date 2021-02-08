import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import AppRoutes from "./routes";

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </BrowserRouter>
);

export default App;
