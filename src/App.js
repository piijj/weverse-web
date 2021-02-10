import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import AuthProvider from "./context/AuthContext";
import AppRoutes from "./routes";
import theme from "./theme";
import DataProvider from "./context/DataContext";

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <DataProvider>
                <ThemeProvider theme={theme}>
                    <AppRoutes />
                </ThemeProvider>
            </DataProvider>
        </AuthProvider>
    </BrowserRouter>
);

export default App;
