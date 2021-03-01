import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
import UserProvider from "./context/UserContext";
import AppRoutes from "./routes";
import theme from "./theme";
import DataProvider from "./context/DataContext";

const App = () => (
    <BrowserRouter>
        <UserProvider>
            <DataProvider>
                <StylesProvider injectFirst>
                    <MuiThemeProvider theme={theme}>
                        <ThemeProvider theme={theme}>
                            <AppRoutes />
                        </ThemeProvider>
                    </MuiThemeProvider>
                </StylesProvider>
            </DataProvider>
        </UserProvider>
    </BrowserRouter>
);

export default App;
