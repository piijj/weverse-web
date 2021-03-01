import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDataDispatch, useDataState } from "../context/DataContext";
import Layout from "../components/shared/Layout";
import Spinner from "../components/shared/Spinner";
import Categories from "../components/shared/Categories";
import CurrentShop from "../components/shared/CurrentShop";
import AddedToCartModal from "../components/ViewProduct/AddedToCartModal";
import NoticePanel from "../components/ViewProduct/NoticePanel";
import ProductDetails from "../components/ViewProduct/ProductDetails";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: Noto Sans KR, sans-serif;
    font-weight: ${(props) => props.fontWeight || "normal"};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin || "10px 0px"};
    text-align: ${(props) => props.textAlign};
`;

const CategoriesWrapper = styled.div`
    width: 250px;
`;

const Image = styled.img`
    max-width: 500px;
    @media (max-width: 800px) {
        margin: 0 auto;
    }
`;

const Body = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 800px) {
        flex-wrap: wrap;
    }
`;

const Product = styled.div``;

const Description = styled.div`
    text-align: center;
`;

const ViewProduct = () => {
    const { productLoading, product, shop } = useDataState();
    const { fetchProduct } = useDataDispatch();
    const [modal, showModal] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchProduct(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            {!shop || productLoading ? (
                <Spinner />
            ) : (
                <Body>
                    <AddedToCartModal modal={modal} showModal={showModal} />
                    <CategoriesWrapper>
                        <CurrentShop />
                        <Categories
                            value={product.category}
                            orientation={
                                window.innerWidth > 800
                                    ? "vertical"
                                    : "horizontal"
                            }
                        />
                    </CategoriesWrapper>
                    <Product>
                        <ProductDetails showModal={showModal} />
                        <NoticePanel />
                        <Text fontSize={24} margin="10px 30px 30px">
                            Description
                        </Text>
                        <Description>
                            {product.description.map((desc) => (
                                <Image src={desc} key={desc} />
                            ))}
                        </Description>
                    </Product>
                </Body>
            )}
        </Layout>
    );
};

export default ViewProduct;
