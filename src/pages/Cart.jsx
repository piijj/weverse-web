import React, { useEffect, useState } from "react";
import {
    Grid,
    Button,
    Divider,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import { AddCircle, RemoveCircle, CheckCircle } from "@material-ui/icons";
import styled from "styled-components";
import Layout from "../components/shared/Layout";
import LoadingSpinner from "../components/shared/Spinner";
import { useUserState } from "../context/UserContext";
import { getCartProductCount, getSubtotal } from "../utils";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight};
    margin: ${(props) => props.margin};
    letter-spacing: ${(props) => props.letterSpacing};
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: ${(props) => props.margin};
    height: 100%;
`;

const QtyWrapper = styled.div`
    margin: 10px 30px;
    display: flex;
    align-items: center;
    width: 80px;
`;

const Body = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @media (max-width: 950px) {
        flex-wrap: wrap;
    }
`;

const Items = styled.div`
    @media (max-width: 950px) {
        margin: 0 auto 30px;
    }
`;

const CheckoutPanel = styled.div`
    background: #ffffff;
    padding: 10px;
    max-width: 500px;
    width: 50%;
    @media (max-width: 950px) {
        margin: 0 auto;
    }
`;

const ButtonWrapper = styled(Button)`
    padding: 0px 15px;
    font-size: 15px;
    height: 30px;
`;

const Details = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
`;

const CheckCircleIcon = styled(CheckCircle)`
    color: rgb(11, 230, 193);
    transform: scale(1.1);
`;

const UncheckedCircleIcon = styled(CheckCircle)`
    color: rgb(235, 235, 235);
    transform: scale(1.1);
`;

const Item = ({ product, checked, updateChecked }) => {
    const [qty, setQty] = useState(product.qty);
    return (
        <FlexWrapper margin="0px 0px 5px">
            <Grid container>
                <Grid item xs>
                    <FlexWrapper>
                        <Checkbox
                            icon={<UncheckedCircleIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            checked={checked.includes(product.id)}
                            onChange={() => updateChecked(product.id)}
                        />
                        <img
                            src={product.product.displayPic}
                            width={75}
                            alt={product.product.name}
                        />
                        <div>
                            <Text
                                fontSize="16"
                                fontWeight="bold"
                                margin="0px 0px 0px 10px"
                            >
                                {product.product.name}
                            </Text>
                        </div>
                    </FlexWrapper>
                </Grid>
                <Grid item xs={3}>
                    <FlexWrapper>
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
                                onClick={() => qty > 1 && setQty(qty - 1)}
                            />
                        </QtyWrapper>
                    </FlexWrapper>
                </Grid>
                <Grid item xs={3}>
                    <FlexWrapper>
                        <Text
                            fontSize="16"
                            fontWeight="bold"
                            color="rgb(11 191 161)"
                        >
                            {" "}
                            ₩
                            {(
                                product.product.price * product.qty
                            ).toLocaleString()}
                        </Text>
                    </FlexWrapper>
                </Grid>
            </Grid>
        </FlexWrapper>
    );
};

const Cart = () => {
    const { cart, loading: userLoading } = useUserState();
    const allIds = cart.map((c) => c.id);
    const [checked, setChecked] = useState([]);

    const updateChecked = (id) => {
        const isChecked = checked.findIndex((i) => i === id);
        if (isChecked >= 0) {
            setChecked(checked.filter((item) => item !== id));
        } else {
            setChecked([...checked, id]);
        }
    };

    useEffect(() => {
        setChecked(allIds);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    return (
        <Layout>
            <Text
                fontFamily="Noto Sans KR, sans-serif"
                fontSize="30"
                fontWeight="bold"
            >
                Cart ({getCartProductCount(cart)})
            </Text>
            {userLoading ? (
                <LoadingSpinner />
            ) : (
                <Body>
                    <Items>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    icon={<UncheckedCircleIcon />}
                                    checkedIcon={<CheckCircleIcon />}
                                    checked={checked.length === allIds.length}
                                    onChange={() =>
                                        setChecked(
                                            checked.length === allIds.length
                                                ? []
                                                : allIds
                                        )
                                    }
                                />
                            }
                            label={
                                <Text fontSize={18} color="rgb(173, 177, 184)">
                                    Select All
                                </Text>
                            }
                        />
                        {cart.map((product) => (
                            <Item
                                product={product}
                                checked={checked}
                                updateChecked={updateChecked}
                                key={product.id}
                            />
                        ))}
                    </Items>
                    <CheckoutPanel>
                        <Text
                            fontFamily="Noto Sans KR, sans-serif"
                            fontSize="14"
                            color="rgb(173, 177, 184)"
                        >
                            Location
                        </Text>
                        <Text
                            fontFamily="Noto Sans KR, sans-serif"
                            fontSize="16"
                            color="rgb(173, 177, 184)"
                            margin="20px 10px"
                        >
                            Seoul, South Korea
                        </Text>
                        <Divider />
                        <Text
                            fontFamily="Noto Sans KR, sans-serif"
                            fontSize="20"
                            fontWeight="bold"
                            margin="10px 0px 0px 0px"
                        >
                            Order Summary
                        </Text>
                        <Details>
                            <Text
                                fontFamily="Noto Sans KR, sans-serif"
                                fontSize="14"
                                color="rgb(173, 177, 184)"
                            >
                                Subtotal
                            </Text>
                            <Text
                                fontFamily="Noto Sans KR, sans-serif"
                                fontSize="14"
                                fontWeight="bold"
                            >
                                ₩{getSubtotal(cart, checked).toLocaleString()}
                            </Text>
                        </Details>
                        <Details>
                            <Text
                                fontFamily="Noto Sans KR, sans-serif"
                                fontSize="14"
                                color="rgb(173, 177, 184)"
                            >
                                Shipping Fee
                            </Text>
                            <Text
                                fontFamily="Noto Sans KR, sans-serif"
                                fontSize="14"
                                fontWeight="bold"
                            >
                                ₩{(22323).toLocaleString()}
                            </Text>
                        </Details>
                        <Divider />
                        <Details>
                            <Text
                                fontFamily="Noto Sans KR, sans-serif"
                                fontSize="16"
                            >
                                Total
                            </Text>
                            <Text
                                fontFamily="Noto Sans KR, sans-serif"
                                fontSize="16"
                                fontWeight="bold"
                                color="rgb(11 191 161)"
                            >
                                ₩
                                {(
                                    getSubtotal(cart, checked) + 22323
                                ).toLocaleString()}
                            </Text>
                        </Details>
                        <ButtonWrapper disabled={checked.length === 0}>
                            Proceed to Checkout
                        </ButtonWrapper>
                    </CheckoutPanel>
                </Body>
            )}
        </Layout>
    );
};

export default Cart;
