import React, { useState } from "react";
import {
    Grid,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@material-ui/core";
import styled from "styled-components";
import Layout from "../components/shared/Layout";
import { useDataState } from "../context/DataContext";
import { useUserState } from "../context/UserContext";
import { convertPrice } from "../utils";
import AddressList from "../components/shared/AddressList";
import ShippingAddressForm from "../components/shared/ShippingAddressForm";
import OrderList from "../components/Account/OrderList";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-weight: ${(props) => props.fontWeight};
    letter-spacing: ${(props) => props.letterSpacing};
    text-align: ${(props) => props.textAlign};
    margin: ${(props) => props.margin};
`;

const Wrapper = styled.div`
    max-width: 500px;
    margin: 30px auto 0px;
`;

const AccordionDetailsWrapper = styled(AccordionDetails)`
    display: block;
`;

const Settings = () => {
    const { currency } = useDataState();
    const { user } = useUserState();
    const [active, setActive] = useState(0);
    const [addAddress, setAddAddress] = useState(false);

    return (
        <Layout>
            <Text
                fontFamily="Noto Sans KR, sans-serif"
                fontSize="30"
                fontWeight="bold"
                letterSpacing="-0.5px"
            >
                Account
            </Text>
            <Wrapper>
                <Accordion
                    expanded={active === 1}
                    onChange={() => setActive(active === 1 ? 0 : 1)}
                >
                    <AccordionSummary>
                        <Text fontSize={18} fontWeight="bold">
                            {user.firstName} {user.lastName}
                        </Text>
                    </AccordionSummary>
                </Accordion>
                <Accordion expanded={false}>
                    <AccordionSummary>
                        <Grid item xs={6}>
                            <Text fontSize={18} fontWeight="bold">
                                Weverse Shop Cash
                            </Text>
                        </Grid>
                        <Grid item xs={6}>
                            <Text
                                textAlign="right"
                                color="#59a9e6"
                                fontSize={18}
                                fontWeight={600}
                            >
                                {convertPrice(user.cash, currency)}
                            </Text>
                        </Grid>
                    </AccordionSummary>
                </Accordion>
                <Accordion
                    expanded={active === 3}
                    onChange={() => setActive(active === 3 ? 0 : 3)}
                >
                    <AccordionSummary>
                        <Text fontSize={18} fontWeight="bold">
                            My Orders
                        </Text>
                    </AccordionSummary>
                    <AccordionDetailsWrapper>
                    <OrderList />
                    </AccordionDetailsWrapper>
                </Accordion>
                <Accordion
                    expanded={active === 4}
                    onChange={() => setActive(active === 4 ? 0 : 4)}
                >
                    <AccordionSummary>
                        <Text fontSize={18} fontWeight="bold">
                            Returns and Exchanges
                        </Text>
                    </AccordionSummary>
                </Accordion>
                <Accordion
                    expanded={active === 5}
                    onChange={() => setActive(active === 5 ? 0 : 5)}
                >
                    <AccordionSummary>
                        <Text fontSize={18} fontWeight="bold">
                            Shipping Addresses
                        </Text>
                    </AccordionSummary>
                    <AccordionDetailsWrapper>
                    {addAddress ? (
                        <ShippingAddressForm setActive={setActive} />
                    ) : (
                        <AddressList
                            setAddAddress={setAddAddress}
                        />
                    )}
                    </AccordionDetailsWrapper>
                </Accordion>
            </Wrapper>
        </Layout>
    );
};

export default Settings;
