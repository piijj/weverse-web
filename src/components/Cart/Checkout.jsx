import React, { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from "@material-ui/core";
import styled from "styled-components";
import { getSelectedItemsCount, getSubtotal } from "../../utils";
import ShippingAddressForm from "./ShippingAddressForm";
import { useUserState } from "../../context/UserContext";

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

const Details = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
`;

const ButtonWrapper = styled(Button)`
    border-radius: 5px;
    width: fit-content;
    padding: 0px 10px;
    background: transparent;
    color: rgb(173, 177, 184);
    height: 20px;
    border: 1px solid rgb(173, 177, 184);
    font-size: 10px;
`;

const AccordionSummaryWrapper = styled(AccordionSummary)`
    & .MuiAccordionSummary-content {
        flex-direction: column;
    }

    & .MuiAccordionSummary-expandIcon.Mui-expanded {
        transform: rotate(0deg);
    }
`;

const AccordionDetailsWrapper = styled(AccordionDetails)`
    display: block;
`;

const Checkout = ({ checked, cart }) => {
    const { address } = useUserState();
    const [active, setActive] = useState(0);
    const count = getSelectedItemsCount(cart, checked);
    return (
        <CheckoutPanel>
            <Details>
                <Text fontFamily="Noto Sans KR, sans-serif" fontSize="14">
                    Total ({count} item{count > 1 && "s"})
                </Text>
                <Text
                    fontFamily="Noto Sans KR, sans-serif"
                    fontSize="14"
                    fontWeight="bold"
                >
                    ₩{getSubtotal(cart, checked).toLocaleString()}
                </Text>
            </Details>
            <Accordion
                expanded={active === 1}
                onChange={() => setActive(active === 1 ? 0 : 1)}
            >
                <AccordionSummaryWrapper
                    expandIcon={<ButtonWrapper>Add</ButtonWrapper>}
                >
                    <Text fontSize={16} fontWeight={400}>
                        Shipping Address
                    </Text>
                    {address ? (
                        <div>
                            <Text color="rgb(173, 177, 184)">
                                {address.firstName} {address.lastName}
                            </Text>
                            <Text color="rgb(173, 177, 184)">
                                {address.state}, {address.country.text}
                            </Text>
                            <Text color="rgb(173, 177, 184)">
                                {address.mobileNumber}
                            </Text>
                        </div>
                    ) : (
                        <Text color="rgb(173, 177, 184)">
                            Add shipping addresss
                        </Text>
                    )}
                </AccordionSummaryWrapper>
                <AccordionDetailsWrapper>
                    <ShippingAddressForm setActive={setActive} />
                </AccordionDetailsWrapper>
            </Accordion>
            <Accordion
                expanded={active === 2}
                onChange={() => setActive(active === 2 ? 0 : 2)}
            >
                <AccordionSummaryWrapper
                    expandIcon={<ButtonWrapper>Add</ButtonWrapper>}
                >
                    <Text fontSize={16} fontWeight={400}>
                        Customer
                    </Text>
                    <Text color="rgb(173, 177, 184)">
                        Add shopper information
                    </Text>
                </AccordionSummaryWrapper>
                <AccordionDetailsWrapper>
                    <Text>
                        Donec placerat, lectus sed mattis semper, neque lectus
                        feugiat lectus, varius pulvinar diam eros in elit.
                        Pellentesque convallis laoreet laoreet.
                    </Text>
                </AccordionDetailsWrapper>
            </Accordion>
        </CheckoutPanel>
    );
};
export default Checkout;
