import React from "react";
import { Chip } from "@material-ui/core";
import styled from "styled-components";
import Layout from "../components/shared/Layout";
import Featured from "../components/Home/Featured";
import Products from "../components/Home/Products";

const Home = () => {
    return (
        <Layout>
            <Featured />
            <Products />
        </Layout>
    );
};

export default Home;
