import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/shared/Layout";
import LoadingSpinner from "../components/shared/Spinner";
import { useUserState } from "../context/UserContext";
import { getCartProductCount, groupCartOrdersByShippingDate } from "../utils";
import Checkout from "../components/Cart/Checkout";
import GroupByShipping from "../components/Cart/GroupByShipping";

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

const Cart = () => {
    const { cart, loading: userLoading } = useUserState();
    const allIds = cart.map((c) => c.id);
    const [checked, setChecked] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        setChecked(allIds);
        setGroups(groupCartOrdersByShippingDate(cart));
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
                        {Object.keys(groups).map((i) => (
                            <GroupByShipping
                                products={groups[i]}
                                checked={checked}
                                setChecked={setChecked}
                                shippingDate={i}
                                key={groups[i]}
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
