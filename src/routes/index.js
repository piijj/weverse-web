import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Routes";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AddProduct from "../pages/AddProduct";
import ViewProduct from "../pages/ViewProduct";
import Cart from "../pages/Cart";
import Settings from "../pages/Settings";

const Wrapper = () => {
    return (
        <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/add" component={AddProduct} />
            <Route path="/product/:id" component={ViewProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Home} />
        </Switch>
    );
};

export default Wrapper;
