import React, { useEffect, useState } from "react";
import { Button, Divider, Modal, Paper } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDataDispatch, useDataState } from "../context/DataContext";
import { useUserDispatch } from "../context/UserContext";
import Layout from "../components/shared/Layout";
import Spinner from "../components/shared/Spinner";
import Categories from "../components/shared/Categories";
import CurrentShop from "../components/shared/CurrentShop";
import { getPoints } from "../utils";

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
    color: red;
    margin: ${(props) => props.margin || "20px 5px 0px 5px"};
    background: ${(props) => props.color || "red"};
    width: ${(props) => props.size || "3px"};
    height: ${(props) => props.size || "3px"};
    border-radius: 50%;
    display: inline-table;
`;

const Description = styled.div`
    text-align: center;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const ButtonWrapper = styled(Button)`
    border-radius: 5px;
    width: fit-content;
    padding: 0px 30px;
    margin: ${(props) => props.margin};
    background: ${(props) => props.bg};
    color: ${(props) =>
        props.bg === "transparent"
            ? "rgb(11, 230, 193)"
            : "rgb(255, 255, 255)"};
`;

const ButtonGroup = styled.div`
    display: flex;
`;

const DividerWrapper = styled(Divider)`
    margin: 10px 0px 10px 30px;
`;

const Badges = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0px 10px 30px;
`;

const QtyWrapper = styled.div`
    margin: 10px 30px;
    display: flex;
    align-items: center;
    ${"" /* width: 100px; */}
`;

const PaperWrapper = styled(Paper)`
    width: 400px;
    height: 320px;
    margin: 15% auto;
    border-radius: 5px;
    outline: none;
    padding: 80px 30px 0px;
    box-sizing: border-box;
    position: relative;
`;

const Check = styled.img`
    left: 155px;
    top: -50px;
    width: 100px;
    position: absolute;
`;

const ModalButton = styled(Button)`
    width: 100%;
    background: ${(props) => props.bg};
    color: ${(props) =>
        props.bg === "transparent"
            ? "rgb(11, 230, 193)"
            : "rgb(255, 255, 255)"};
    text-transform: inherit;
    border-radius: 5px;
    height: 40px;
    margin: ${(props) => props.margin};
`;

const ViewProduct = () => {
    const { productLoading, product, shop } = useDataState();
    const { fetchProduct } = useDataDispatch();
    const { handleAddToCart } = useUserDispatch();
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const [loading, isLoading] = useState(false);
    const [modal, showModal] = useState(false);

    const addToCart = async () => {
        await isLoading(true);
        await handleAddToCart(
            { qty, productId: product.id, shopId: shop.id },
            showModal
        );
        await isLoading(false);
    };

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
                    <Modal open={modal} onClose={() => showModal(false)}>
                        <PaperWrapper>
                            <Check src="/images/check.svg" />
                            <Text
                                fontSize={16}
                                margin="10px 0px 40px"
                                textAlign="center"
                            >
                                Added to Cart
                            </Text>
                            <Divider />
                            <ModalButton
                                bg="transparent"
                                margin="40px 0px 20px"
                                onClick={() => showModal(false)}
                            >
                                Continue Shopping
                            </ModalButton>
                            <ModalButton>Go to Cart</ModalButton>
                        </PaperWrapper>
                    </Modal>
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
                        <Details>
                            <Image src={product.displayPic} />
                            <div>
                                <Badges>
                                    {product.isMembersOnly && (
                                        <>
                                            <img
                                                src="/images/weverse-membership.svg"
                                                width={25}
                                                alt="Weverse Membership"
                                            />
                                            &nbsp;
                                            <Text
                                                fontSize={16}
                                                color="#9557F7"
                                                margin="10px 0px"
                                            >
                                                ONLY
                                            </Text>
                                        </>
                                    )}
                                    {product.isMembersOnly &&
                                        product.isExclusive && (
                                            <Circle
                                                size="5px"
                                                color="#bdc0c5"
                                                margin="0px 15px"
                                            />
                                        )}
                                    {product.isExclusive && (
                                        <>
                                            <img
                                                src="/images/exclusive.svg"
                                                width={15}
                                                alt="Weverse Exclusive"
                                            />
                                            <Text
                                                fontSize={16}
                                                margin="10px 10px"
                                                color="#0BE6C1"
                                            >
                                                EXCLUSIVE
                                            </Text>
                                        </>
                                    )}
                                </Badges>
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
                                <QtyWrapper>
                                    <AddCircle
                                        color={
                                            product.maxQtyPerOrder > qty
                                                ? "primary"
                                                : "disabled"
                                        }
                                        onClick={() =>
                                            product.maxQtyPerOrder > qty &&
                                            setQty(qty + 1)
                                        }
                                    />
                                    <Text fontSize={16} margin="0px 10px">
                                        {qty}
                                    </Text>
                                    <RemoveCircle
                                        color={qty > 1 ? "primary" : "disabled"}
                                        onClick={() =>
                                            qty > 1 && setQty(qty - 1)
                                        }
                                    />
                                </QtyWrapper>
                                <ButtonGroup>
                                    <ButtonWrapper
                                        margin="10px 10px 10px 30px"
                                        bg="transparent"
                                        disabled={loading}
                                        onClick={addToCart}
                                    >
                                        Add To Cart
                                    </ButtonWrapper>
                                    <ButtonWrapper margin="10px 0px 10px 30px">
                                        Buy Now
                                    </ButtonWrapper>
                                </ButtonGroup>
                                {product.isPreorder && (
                                    <>
                                        <DividerWrapper />
                                        <Text
                                            fontSize={14}
                                            margin="10px 0px 10px 30px"
                                        >
                                            <img
                                                src="/images/timer.svg"
                                                width={10}
                                                alt="Preorder"
                                            />{" "}
                                            For pre-order
                                        </Text>
                                        <Text
                                            fontSize={14}
                                            margin="10px 0px 10px 30px"
                                            color="#878E96"
                                        >
                                            Shipping starts on{" "}
                                            {moment(
                                                product.shippingDate
                                            ).format("DD/MM/YYYY")}
                                        </Text>
                                    </>
                                )}
                            </div>
                        </Details>
                        <Notice>
                            {product.isPreorder && shop.name === "Global" && (
                                <Bullet>
                                    <Circle />
                                    <Text fontSize={16} color="#878E96">
                                        Pre-order:{" "}
                                        {moment(
                                            product.preorderStartDate
                                        ).format("D MMMM, h A")}{" "}
                                        ~{" "}
                                        {moment(product.preorderEndDate).format(
                                            "D MMMM, h A"
                                        )}{" "}
                                        (KST)
                                    </Text>
                                </Bullet>
                            )}
                            {product.preorderGift && shop.name === "Global" && (
                                <Bullet>
                                    <Circle />
                                    <Text fontSize={16} color="#878E96">
                                        {product.name} comes with{" "}
                                        {product.preorderGift.join(" and ")}.
                                    </Text>
                                </Bullet>
                            )}
                            {product.category === "ALBUM" &&
                                shop.name === "Global" && (
                                    <>
                                        <Bullet>
                                            <Circle />
                                            <Text fontSize={16} color="#878E96">
                                                All sales from Weverse Shop
                                                Global will count for the album
                                                charts in South Korea
                                            </Text>
                                        </Bullet>
                                        <Bullet>
                                            <Circle />
                                            <Text fontSize={16} color="#878E96">
                                                Please visit Weverse Shop USA if
                                                you are a customer in the US. US
                                                customers cannot purchase this.
                                            </Text>
                                        </Bullet>
                                        <Bullet>
                                            <Circle />
                                            <Text fontSize={16} color="#878E96">
                                                This album will be shipped out
                                                from Korea. The international
                                                shipping fee will be charged
                                                separately.
                                            </Text>
                                        </Bullet>
                                    </>
                                )}
                            <Bullet>
                                <Circle />
                                <Text fontSize={16} color="#878E96">
                                    You can buy up to {product.maxQtyPerOrder}.
                                </Text>
                            </Bullet>
                            {shop.name === "Global" && (
                                <Bullet>
                                    <Circle />
                                    <Text fontSize={16} color="#878E96">
                                        As more countries/regions are
                                        experiencing shipping delays and
                                        imposing shipping restrictions due to
                                        COVID-19, shipping to the country/region
                                        you selected may be unavailable. Please
                                        check the announcement on shipping delay
                                        and restriction. We will do our best to
                                        resume shipping as soon as possible
                                    </Text>
                                </Bullet>
                            )}
                        </Notice>

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
