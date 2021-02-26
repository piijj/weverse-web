import React from "react";
import { Button, Divider } from "@material-ui/core";
import styled from "styled-components";
import { getSubtotal } from "../../utils";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight};
    margin: ${(props) => props.margin};
    letter-spacing: ${(props) => props.letterSpacing};
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

const Checkout = ({ checked, cart }) => (
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
            <Text fontFamily="Noto Sans KR, sans-serif" fontSize="16">
                Total
            </Text>
            <Text
                fontFamily="Noto Sans KR, sans-serif"
                fontSize="16"
                fontWeight="bold"
                color="rgb(11 191 161)"
            >
                ₩{(getSubtotal(cart, checked) + 22323).toLocaleString()}
            </Text>
        </Details>
        <ButtonWrapper disabled={checked.length === 0}>
            Proceed to Checkout
        </ButtonWrapper>
    </CheckoutPanel>
);

export default Checkout;
