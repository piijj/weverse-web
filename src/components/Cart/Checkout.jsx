import React, { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    InputAdornment,
    OutlinedInput,
} from "@material-ui/core";
import styled from "styled-components";
import { convertPrice, getSelectedItemsCount, getSubtotal } from "../../utils";
import { useUserState } from "../../context/UserContext";
import ShippingAddressForm from "./ShippingAddressForm";
import AddressList from "./AddressList";
import ShopperDetailsForm from "./ShopperDetailsForm";
import ShippingOption from "./ShippingOption";
import { useDataState } from "../../context/DataContext";
import currencies from "../../utils/currencies";

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

const OutlinedInputWrapper = styled(OutlinedInput)`
    margin-right: 10px;
    width: 75%;
`;

const CashButton = styled(Button)`
    height: 47px;
    width: 90px;
`;

const Checkout = ({ checked, cart }) => {
    const { user, address, addresses, shopperDetails } = useUserState();
    const { currency } = useDataState();
    const [active, setActive] = useState(0);
    const [addAddress, setAddAddress] = useState(false);
    const [cashToUse, setCashToUser] = useState("");
    const count = getSelectedItemsCount(cart, checked);
    const cash = convertPrice(user.cash, currency, false);

    const shipToSK = address && address.country.text === "South Korea";
    const details = `For general product, it could take 7-14 business days. Please check release date for pre-order item. ${
        shipToSK &&
        "Additional shipping fee will be charged for Jeju Island, Ulleung Island, and other regions. (3,000 / 5,000 KRW depending on regions)"
    }`;

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
                    {getSubtotal(cart, checked, currency).toLocaleString()}
                </Text>
            </Details>
            <Accordion
                expanded={active === 1}
                onChange={() => setActive(active === 1 ? 0 : 1)}
            >
                <AccordionSummaryWrapper
                    expandIcon={
                        <ButtonWrapper>
                            {address
                                ? "Change"
                                : addresses.length > 0
                                ? "Select"
                                : "Add"}
                        </ButtonWrapper>
                    }
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
                                {address.address}, {address.city},{" "}
                                {address.state}, {address.country.text}
                            </Text>
                            <Text color="rgb(173, 177, 184)">
                                {address.mobileNumber}
                            </Text>
                        </div>
                    ) : (
                        <Text color="rgb(173, 177, 184)">
                            {address
                                ? "Change"
                                : addresses.length > 0
                                ? "Select"
                                : "Add"}{" "}
                            shipping addresss
                        </Text>
                    )}
                </AccordionSummaryWrapper>
                <AccordionDetailsWrapper>
                    {addresses.length === 0 || addAddress ? (
                        <ShippingAddressForm setActive={setActive} />
                    ) : (
                        <AddressList
                            setActive={setActive}
                            setAddAddress={setAddAddress}
                        />
                    )}
                </AccordionDetailsWrapper>
            </Accordion>
            <Accordion
                expanded={active === 2}
                onChange={() => setActive(active === 2 ? 0 : 2)}
            >
                <AccordionSummaryWrapper
                    expandIcon={
                        <ButtonWrapper>
                            {shopperDetails ? "Change" : "Add"}
                        </ButtonWrapper>
                    }
                >
                    <Text fontSize={16} fontWeight={400}>
                        Customer
                    </Text>
                    {shopperDetails ? (
                        <div>
                            <Text color="rgb(173, 177, 184)">
                                {shopperDetails.firstName}{" "}
                                {shopperDetails.lastName}
                            </Text>
                            <Text color="rgb(173, 177, 184)">
                                {shopperDetails.email}
                            </Text>
                            <Text color="rgb(173, 177, 184)">
                                {shopperDetails.mobileNumber}
                            </Text>
                        </div>
                    ) : (
                        <Text color="rgb(173, 177, 184)">
                            Add shopper information
                        </Text>
                    )}
                </AccordionSummaryWrapper>
                <AccordionDetailsWrapper>
                    <ShopperDetailsForm setActive={setActive} />
                </AccordionDetailsWrapper>
            </Accordion>
            <Accordion
                expanded={active === 3}
                onChange={() => setActive(active === 3 ? 0 : 3)}
            >
                <AccordionSummaryWrapper
                    expandIcon={<ButtonWrapper>Change</ButtonWrapper>}
                >
                    <Text fontSize={16} fontWeight={400}>
                        Shipping Option
                    </Text>
                    <div>
                        <Text margin="10px 0px">
                            {shipToSK
                                ? `CJ 대한 통운 (${currencies[currency].symbol}0)`
                                : `International Shipping Fee (${convertPrice(
                                      26780,
                                      currency
                                  )})`}
                        </Text>
                        <Text color="rgb(173, 177, 184)">{details}</Text>
                    </div>
                </AccordionSummaryWrapper>
                <AccordionDetailsWrapper>
                    <ShippingOption
                        setActive={setActive}
                        shipToSK={shipToSK}
                        details={details}
                    />
                </AccordionDetailsWrapper>
            </Accordion>
            <Accordion expanded={false}>
                <AccordionSummaryWrapper>
                    <Text fontSize={16} fontWeight={400}>
                        Weverse Shop Cash
                    </Text>
                    <Details>
                        <OutlinedInputWrapper
                            type="number"
                            value={cashToUse}
                            onChange={(e) => setCashToUser(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    {currencies[currency].symbol}
                                </InputAdornment>
                            }
                            disabled={user.cash === 0}
                            inputProps={{
                                min: 0,
                                max: Number(cash),
                                step:
                                    currency === "KRW"
                                        ? 1
                                        : currency === "JPY"
                                        ? 0.1
                                        : 0.01,
                            }}
                        />
                        <CashButton onClick={() => setCashToUser(cash)}>
                            Use All
                        </CashButton>
                    </Details>
                    <Text color="rgb(173, 177, 184)">
                        Available now: {currencies[currency].symbol}
                        {cash}
                    </Text>
                </AccordionSummaryWrapper>
            </Accordion>
        </CheckoutPanel>
    );
};
export default Checkout;
