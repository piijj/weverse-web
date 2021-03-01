import React, { useState } from "react";
import { Button, Divider } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import styled from "styled-components";
import moment from "moment";
import { useDataState } from "../../context/DataContext";
import { useUserDispatch } from "../../context/UserContext";
import { getPoints } from "../../utils";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: Noto Sans KR, sans-serif;
    font-weight: ${(props) => props.fontWeight || "normal"};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin || "10px 0px"};
    text-align: ${(props) => props.textAlign};
`;

const Image = styled.img`
    max-width: 500px;
    @media (max-width: 800px) {
        margin: 0 auto;
    }
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

const Details = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const ButtonWrapper = styled(Button)`
    border-radius: 5px;
    width: fit-content;
    padding: 0px 30px;
    ${({ theme, bg, margin }) => `
    margin: ${margin};
    background: ${bg};
    color: ${
        bg === "transparent"
            ? theme.palette.primary.main
            : theme.palette.secondary.main
    };
    `}
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
`;

const ProductDetails = ({ showModal }) => {
    const { product, shop } = useDataState();
    const { handleAddToCart } = useUserDispatch();
    const [qty, setQty] = useState(1);
    const [loading, isLoading] = useState(false);

    const addToCart = async () => {
        await isLoading(true);
        await handleAddToCart(
            { qty, productId: product.id, shopId: shop.id },
            showModal
        );
        await isLoading(false);
    };

    return (
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
                    {product.isMembersOnly && product.isExclusive && (
                        <Circle size="5px" color="#bdc0c5" margin="0px 15px" />
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
                    Weverse Shop Cash ₩{getPoints(product.price)}
                </Text>
                <QtyWrapper>
                    <AddCircle
                        color={
                            product.maxQtyPerOrder > qty
                                ? "primary"
                                : "disabled"
                        }
                        onClick={() =>
                            product.maxQtyPerOrder > qty && setQty(qty + 1)
                        }
                    />
                    <Text fontSize={16} margin="0px 10px">
                        {qty}
                    </Text>
                    <RemoveCircle
                        color={qty > 1 ? "primary" : "disabled"}
                        onClick={() => qty > 1 && setQty(qty - 1)}
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
                        <Text fontSize={14} margin="10px 0px 10px 30px">
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
                            {moment(product.shippingDate).format("DD/MM/YYYY")}
                        </Text>
                    </>
                )}
            </div>
        </Details>
    );
};

export default ProductDetails;
