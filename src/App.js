import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import AuthProvider from "./context/AuthContext";
import AppRoutes from "./routes";
import theme from "./theme";

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <AppRoutes />
            </ThemeProvider>
        </AuthProvider>
    </BrowserRouter>
);

export default App;
