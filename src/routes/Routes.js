import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

const Wrapper = ({ component: Component, isPrivate, ...rest }) => {
    const { user, loading } = useAuthState();
    const showHeader = rest.path != "/login" && rest.path != "/signup";

    // if ((rest.path === "/login" || rest.path === "/register") && user) {
    //   return <Redirect to="/" />;
    // }

    return (
        // loading ? (
        //   <div>Loading</div>
        // ) : (
        <Route
            {...rest}
            render={(props) => (
                <div>
                    <Component {...props} />
                </div>
            )}
        />
    );
};

export default Wrapper;
