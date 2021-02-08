import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Routes";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Wrapper = () => {
    return (
        <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/" component={<div>hello</div>} />
        </Switch>
    );
};

export default Wrapper;
