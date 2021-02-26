import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import styled from "styled-components";
import Layout from "../components/shared/Layout";
import LoadingSpinner from "../components/shared/Spinner";
import { useUserState } from "../context/UserContext";
import { getCartProductCount } from "../utils";
import Checkout from "../components/Cart/Checkout";
import Item from "../components/Cart/Item";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight};
    margin: ${(props) => props.margin};
    letter-spacing: ${(props) => props.letterSpacing};
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
    margin-right: 30px;
    @media (max-width: 950px) {
        margin: 0 auto 30px auto;
    }
`;

const CheckCircleIcon = styled(CheckCircle)`
    color: rgb(11, 230, 193);
`;

const UncheckedCircleIcon = styled(CheckCircle)`
    color: rgb(235, 235, 235);
`;

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
                    <Checkout cart={cart} checked={checked} />
                </Body>
            )}
        </Layout>
    );
};

export default Cart;
