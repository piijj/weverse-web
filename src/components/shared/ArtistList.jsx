import React, { useState, useEffect } from "react";
import {
    ListItem,
    Radio,
    FormControlLabel,
    RadioGroup,
} from "@material-ui/core";
import styled from "styled-components";
import { useDataState } from "../../context/DataContext";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin};
    letter-spacing: ${(props) => props.letterSpacing};
`;

const Logo = styled.img`
    display: block;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(32, 36, 41, 0.1);
    border-radius: 30px;
    ${({ theme }) => `
        background-color: ${theme.palette.secondary.main};
    `}
    overflow: hidden;
    flex-shrink: 0;
`;

const ArtistWrapper = styled(ListItem)`
    padding: 11px 0px;
    cursor: pointer;

    & .MuiListItem-gutters {
        padding-left: 0px;
        padding-right: 0px;
    }
`;

const Shop = styled.div`
    width: 100px;
    display: flex;
    align-items: center;
`;

const ArtistList = ({ handleSelectArtistAndShop, checkboxLabelAlign }) => {
    const { artists, shops, shop, artist } = useDataState();
    const [preselectedArtist, setPreselectedArtist] = useState(artist || "");
    const [preselectedShop, setPreselectedShop] = useState(
        artist === preselectedArtist ? shop : ""
    );

    useEffect(() => {
        setPreselectedShop("");
    }, [preselectedArtist]);

    return (
        <>
            {artists.map((data, index) => (
                <div key={data.id}>
                    <ArtistWrapper
                        key={index}
                        onClick={() => setPreselectedArtist(data)}
                    >
                        <Logo src={data.logo} alt={data.name} />
                        <Text
                            fontFamily="Noto Sans KR, sans-serif"
                            letterSpacing="-0.5px"
                            color="rgb(52, 58, 64)"
                            margin="0px 0px 0px 12px"
                        >
                            {data.displayName}
                        </Text>
                    </ArtistWrapper>
                    {preselectedArtist === data && (
                        <RadioGroup
                            name="shop"
                            defaultValue={
                                preselectedShop ? preselectedShop.id : ""
                            }
                            onChange={(e) => {
                                handleSelectArtistAndShop(
                                    preselectedArtist,
                                    shops[e.target.value]
                                );
                            }}
                        >
                            <div>
                                {data.shopIds.map((shop) => (
                                    <FormControlLabel
                                        key={shop}
                                        value={shop}
                                        control={<Radio color="primary" />}
                                        label={
                                            <Shop>
                                                <img
                                                    width="20px"
                                                    src={shops[shop].logo}
                                                    alt="Shop"
                                                />
                                                <Text
                                                    fontSize="12"
                                                    fontFamily="Noto Sans KR, sans-serif"
                                                    letterSpacing="-0.5px"
                                                    color="rgb(52, 58, 64)"
                                                    margin="0px 0px 0px 12px"
                                                >
                                                    {shops[
                                                        shop
                                                    ].name.toUpperCase()}
                                                </Text>
                                            </Shop>
                                        }
                                        labelPlacement={
                                            checkboxLabelAlign || "start"
                                        }
                                    />
                                ))}
                            </div>
                        </RadioGroup>
                    )}
                </div>
            ))}
        </>
    );
};

export default ArtistList;
