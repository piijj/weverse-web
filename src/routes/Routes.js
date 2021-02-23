import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { useAuthState } from "../context/AuthContext";

const Wrapper = ({ component: Component, isPrivate, ...rest }) => {
    const { user, msg } = useAuthState();

    if (
        (rest.path === "/login" || rest.path === "/signup") &&
        user &&
        user.emailVerified
    ) {
        return <Redirect to="/" />;
    }

    return (
        <Route
            {...rest}
            render={(props) => (
                <div>
                    {msg && <Alert severity={msg.type}>{msg.msg}</Alert>}
                    <Component {...props} />
                </div>
            )}
        />
    );
};

export default Wrapper;
