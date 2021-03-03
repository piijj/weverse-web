import React, { useState } from "react";
import {
    Grid,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@material-ui/core";
import styled from "styled-components";
import Layout from "../components/shared/Layout";
import { useDataDispatch, useDataState } from "../context/DataContext";
import Spinner from "../components/shared/Spinner";
import currencies from "../utils/currencies";
import ArtistList from "../components/shared/ArtistList";

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

const Circle = styled.div`
    margin: 0px 5px;
    background: #59a9e6;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    display: inline-table;
    margin-bottom: 5px;
`;

const AccordionDetailsWrapper = styled(AccordionDetails)`
    display: block;
`;

const Settings = () => {
    const { shop, artist, currency } = useDataState();
    const { dispatch } = useDataDispatch();
    const [active, setActive] = useState(0);

    const handleSelectArtistAndShop = (artist, shop) => {
        dispatch({ type: "SET_ARTIST_AND_SHOP", payload: { artist, shop } });
        setActive(0);
    };

    const handleSelectCurrency = (c) => {
        dispatch({ type: "SET_CURRENCY", payload: c });
        setActive(0);
    };

    return (
        <Layout>
            {!shop ? (
                <Spinner />
            ) : (
                <>
                    <Text
                        fontFamily="Noto Sans KR, sans-serif"
                        fontSize="30"
                        fontWeight="bold"
                        letterSpacing="-0.5px"
                    >
                        Settings
                    </Text>
                    <Wrapper>
                        <Accordion
                            expanded={active === 1}
                            onChange={() => setActive(active === 1 ? 0 : 1)}
                        >
                            <AccordionSummary>
                                <Grid item xs={6}>
                                    <Text fontSize={18} fontWeight="bold">
                                        Artist and Shop
                                    </Text>
                                </Grid>
                                <Grid item xs={6}>
                                    <Text
                                        textAlign="right"
                                        color="#59a9e6"
                                        fontSize={18}
                                        fontWeight={600}
                                    >
                                        {artist.name}{" "}
                                        <Circle
                                            size="5px"
                                            color="#bdc0c5"
                                            margin="0px 15px"
                                        />{" "}
                                        {shop.name.toUpperCase()}
                                    </Text>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetailsWrapper>
                                <ArtistList
                                    handleSelectArtistAndShop={
                                        handleSelectArtistAndShop
                                    }
                                    checkboxLabelAlign="end"
                                />
                            </AccordionDetailsWrapper>
                        </Accordion>
                        <Accordion expanded={false}>
                            <AccordionSummary>
                                <Grid item xs={6}>
                                    <Text fontSize={18} fontWeight="bold">
                                        Language
                                    </Text>
                                </Grid>
                                <Grid item xs={6}>
                                    <Text
                                        textAlign="right"
                                        color="#59a9e6"
                                        fontSize={18}
                                        fontWeight={600}
                                    >
                                        English
                                    </Text>
                                </Grid>
                            </AccordionSummary>
                        </Accordion>
                        <Accordion
                            expanded={active === 3}
                            onChange={() => setActive(active === 3 ? 0 : 3)}
                        >
                            <AccordionSummary>
                                <Grid item xs={6}>
                                    <Text fontSize={18} fontWeight="bold">
                                        Currency
                                    </Text>
                                </Grid>
                                <Grid item xs={6}>
                                    <Text
                                        textAlign="right"
                                        color="#59a9e6"
                                        fontSize={18}
                                        fontWeight={600}
                                    >
                                        {currencies[currency].symbol} (
                                        {currency.toUpperCase()})
                                    </Text>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetailsWrapper>
                                <RadioGroup
                                    defaultValue={currency}
                                    onChange={(e) => {
                                        handleSelectCurrency(e.target.value);
                                    }}
                                >
                                    {Object.keys(currencies).map((c) => (
                                        <FormControlLabel
                                            key={c}
                                            value={c}
                                            control={<Radio color="primary" />}
                                            label={
                                                <Text fontSize={14}>
                                                    {currencies[c].symbol} (
                                                    {c.toUpperCase()}) -{" "}
                                                    {currencies[c].displayName}
                                                </Text>
                                            }
                                            labelPlacement="end"
                                        />
                                    ))}
                                </RadioGroup>
                            </AccordionDetailsWrapper>
                        </Accordion>
                    </Wrapper>
                </>
            )}
        </Layout>
    );
};

export default Settings;
