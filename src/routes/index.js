import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Routes";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AddProduct from "../pages/AddProduct";
import ViewProduct from "../pages/ViewProduct";

const Wrapper = () => {
    return (
        <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/add" component={AddProduct} />
            <Route path="/product/:id" component={ViewProduct} />
            <Route path="/" component={Home} />
        </Switch>
    );
};

export default Wrapper;
