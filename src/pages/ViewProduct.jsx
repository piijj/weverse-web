import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDataDispatch, useDataState } from "../context/DataContext";
import Layout from "../components/shared/Layout";
import Spinner from "../components/shared/Spinner";
import Categories from "../components/shared/Categories";
import { getPoints } from "../utils";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: Noto Sans KR, sans-serif;
    font-weight: ${(props) => props.fontWeight || "normal"};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin || "10px 0px"};
`;

const CategoriesWrapper = styled.div`
    width: 250px;
`;

const Image = styled.img`
    max-width: 500px;
`;

const Body = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Product = styled.div``;

const Notice = styled.div`
    border: 5px solid #bdc0c5;
    padding: 10px;
    margin: 50px 30px;
    border-radius: 10px;
`;

const Bullet = styled.div`
    display: flex;
    align-items: flex-start;
`;

const Circle = styled.div`
    color: #878e96;
    margin: 20px 5px 0px 5px;
    background: #878e96;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    display: inline-table;
`;

const Description = styled.div`
    text-align: center;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonWrapper = styled(Button)`
    border-radius: 15px;
    width: fit-content;
    padding: 0px 30px;
    margin: ${(props) => props.margin};
`;

const ButtonGroup = styled.div`
    display: flex;
`;

const ViewProduct = () => {
    const { productLoading, product } = useDataState();
    const { fetchProduct } = useDataDispatch();
    const { id } = useParams();
    console.log("----", id);

    useEffect(() => {
        fetchProduct(id);
    }, []);

    return (
        <Layout>
            {productLoading ? (
                <Spinner />
            ) : (
                <Body>
                    <CategoriesWrapper>
                        <Categories
                            value={product.category}
                            orientation="vertical"
                        />
                    </CategoriesWrapper>
                    <Product>
                        <Details>
                            <Image src={product.displayPic} />
                            <div>
                                <Text fontSize={18} margin="10px 0px 10px 30px">
                                    {product.name}
                                </Text>
                                <Text
                                    fontSize={24}
                                    fontWeight="bold"
                                    margin="10px 0px 10px 30px"
                                >
                                    ₩{product.price.toLocaleString()}
                                </Text>
                                <Text
                                    fontSize={18}
                                    color="rgb(63, 162, 244)"
                                    margin="10px 0px 10px 30px"
                                >
                                    Weverse Shop Cash ₩
                                    {getPoints(product.price)}
                                </Text>
                                <ButtonGroup>
                                    <ButtonWrapper margin="10px 10px 10px 30px">
                                        Add To Cart
                                    </ButtonWrapper>
                                    <ButtonWrapper margin="10px 0px 10px 30px">
                                        Buy Now
                                    </ButtonWrapper>
                                </ButtonGroup>
                            </div>
                        </Details>
                        <Notice>
                            <Bullet>
                                <Circle />
                                <Text fontSize={16} color="#BDC0C5">
                                    You can buy up to {product.maxQtyPerOrder}.
                                </Text>
                            </Bullet>
                            <Bullet>
                                <Circle />
                                <Text fontSize={16} color="#BDC0C5">
                                    As more countries/regions are experiencing
                                    shipping delays and imposing shipping
                                    restrictions due to COVID-19, shipping to
                                    the country/region you selected may be
                                    unavailable. Please check the announcement
                                    on shipping delay and restriction. We will
                                    do our best to resume shipping as soon as
                                    possible
                                </Text>
                            </Bullet>
                        </Notice>

                        <Text fontSize={24} margin="10px 30px 30px">
                            Description
                        </Text>
                        <Description>
                            {product.description.map((desc) => (
                                <Image src={desc} />
                            ))}
                        </Description>
                    </Product>
                </Body>
            )}
        </Layout>
    );
};

export default ViewProduct;
