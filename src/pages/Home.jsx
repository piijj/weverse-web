import React from "react";
import CurrentShop from "../components/shared/CurrentShop";
import Layout from "../components/shared/Layout";
import Featured from "../components/Home/Featured";
import Products from "../components/Home/Products";

const Home = () => {
    return (
        <Layout>
            <CurrentShop />
            <Featured />
            <Products />
        </Layout>
    );
};

export default Home;
