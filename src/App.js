import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import UserProvider from "./context/UserContext";
import AppRoutes from "./routes";
import theme from "./theme";
import DataProvider from "./context/DataContext";

const App = () => (
    <BrowserRouter>
        <UserProvider>
            <DataProvider>
                <ThemeProvider theme={theme}>
                    <AppRoutes />
                </ThemeProvider>
            </DataProvider>
        </UserProvider>
    </BrowserRouter>
);

export default App;
