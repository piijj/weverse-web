import React, { useState } from "react";
import {
    AppBar,
    Drawer,
    IconButton,
    ListItem,
    Radio,
    Toolbar,
    FormControlLabel,
    RadioGroup,
} from "@material-ui/core";
import styled from "styled-components";
import { useDataState, useDataDispatch } from "../../context/DataContext";
import Spinner from "../shared/Spinner";
import { useAuthState } from "../../context/AuthContext";

const DrawerWrapper = styled(Drawer)`
    top: 75px !important;

    & .MuiDrawer-paper {
        top: 75px;
        box-shadow: none;
        width: 210px;
        border-right: "1px solid rgb(235, 235, 235)";
        padding: 18px 30px;
        box-sizing: border-box;
    }
`;

const Group = styled.div`
    display: flex;
    align-items: center;
`;

const Icon = styled.img`
    margin: ${(props) => props.margin};
    max-width: 170px;
`;

const ToolbarWrapper = styled(Toolbar)`
    height: 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 32px;
`;

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
    background-color: rgb(255, 255, 255);
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

const Body = styled.div`
    margin: 40px auto;
    max-width: 1136px;
    padding: 0px 48px;
`;

const Layout = ({ children }) => {
    const {
        artists,
        shops,
        artist,
        shop,
        loading: dataLoading,
    } = useDataState();
    const { loading: authLoading } = useAuthState();
    const { handleSelectArtist, handleSelectShop } = useDataDispatch();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <AppBar position="static" color="secondary">
                <ToolbarWrapper>
                    <Group>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <img src="images/menu.svg" />
                        </IconButton>
                        <Icon
                            margin="0px 0px 0px 16px"
                            src="images/weverse-shop.png"
                        />
                    </Group>
                    <Group>
                        <img src="images/account.svg" />
                        <Icon
                            margin="0px 25px"
                            src="images/notifications.svg"
                        />
                        <img src="images/settings.svg" />
                    </Group>
                </ToolbarWrapper>
            </AppBar>

            {authLoading || dataLoading ? (
                <Spinner />
            ) : (
                <Body>
                    {children}

                    <DrawerWrapper
                        anchor="left"
                        open={isOpen}
                        color="secondary"
                        hideBackdrop
                    >
                        <>
                            <Text
                                fontSize="13px"
                                fontWeight="bold"
                                color="rgb(173, 177, 184)"
                            >
                                Artists
                            </Text>
                            {artists.map((data, index) => (
                                <div key={data.id}>
                                    <ArtistWrapper
                                        key={index}
                                        onClick={() => handleSelectArtist(data)}
                                    >
                                        <Logo src={data.logo} />
                                        <Text
                                            fontFamily="Noto Sans KR, sans-serif"
                                            letterSpacing="-0.5px"
                                            color="rgb(52, 58, 64)"
                                            margin="0px 0px 0px 12px"
                                        >
                                            {data.displayName}
                                        </Text>
                                    </ArtistWrapper>
                                    {artist === data && (
                                        <RadioGroup
                                            name="shop"
                                            defaultValue={shop ? shop.id : ""}
                                            onChange={(e) => {
                                                handleSelectShop(
                                                    shops[e.target.value]
                                                );
                                                setIsOpen(false);
                                            }}
                                        >
                                            {data.shopIds.map((shop) => (
                                                <FormControlLabel
                                                    key={shop}
                                                    value={shop}
                                                    control={
                                                        <Radio color="primary" />
                                                    }
                                                    label={
                                                        <Shop>
                                                            <img
                                                                width="20px"
                                                                src={
                                                                    shops[shop]
                                                                        .logo
                                                                }
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
                                                    labelPlacement="start"
                                                />
                                            ))}
                                        </RadioGroup>
                                    )}
                                </div>
                            ))}
                        </>
                    </DrawerWrapper>
                </Body>
            )}
        </>
    );
};

export default Layout;
