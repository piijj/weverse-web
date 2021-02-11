import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Routes";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AddProduct from "../pages/AddProduct";

const Wrapper = () => {
    return (
        <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/add" component={AddProduct} />
            <Route path="/" component={Home} />
        </Switch>
    );
};

export default Wrapper;
