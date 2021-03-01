import React from "react";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import styled from "styled-components";
import { useUserDispatch, useUserState } from "../../context/UserContext";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight};
    margin: ${(props) => props.margin};
    letter-spacing: ${(props) => props.letterSpacing};
`;

const ButtonWrapper = styled(Button)`
    border-radius: 5px;
    padding: 0px 10px;
    font-size: 12px;
    width: 100%;
    height: 20px;
    ${({ theme }) => `
        color: ${theme.palette.primary.secondary};
        border: ${`1px solid ${theme.palette.primary.main}`}
    `}
`;

const CardWrapper = styled(Card)`
    margin-bottom: 10px;
`;

const Checkout = ({ setActive }) => {
    const { addresses } = useUserState();
    const { dispatch } = useUserDispatch();

    const handleSelectAddress = (address) => {
        dispatch({
            type: "SET_ADDRESS",
            payload: address,
        });
        setActive(0);
    };

    return (
        <>
            {addresses.map((address) => (
                <CardWrapper>
                    <CardContent>
                        <Text>
                            {address.firstName} {address.lastName}
                        </Text>
                        <Text>
                            {address.address}, {address.city}, {address.state},{" "}
                            {address.country.text}
                        </Text>
                        <Text>{address.postalCode}</Text>
                        <Text>{address.mobileNumber}</Text>
                    </CardContent>
                    <CardActions>
                        <ButtonWrapper
                            onClick={() => handleSelectAddress(address)}
                        >
                            Select
                        </ButtonWrapper>
                    </CardActions>
                </CardWrapper>
            ))}
        </>
    );
};
export default Checkout;
