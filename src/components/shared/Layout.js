import React, { useState } from "react";
import {
    AppBar,
    Drawer,
    IconButton,
    Toolbar,
    Badge,
    Menu,
    Button,
} from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDataState, useDataDispatch } from "../../context/DataContext";
import Spinner from "../shared/Spinner";
import { useUserState } from "../../context/UserContext";
import { convertPrice, getCartProductCount } from "../../utils";
import ArtistList from "./ArtistList";

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
    cursor: pointer;
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
    width: ${(props) => props.width};
    text-align: ${(props) => props.textAlign};
`;

const Body = styled.div`
    margin: 40px auto;
    max-width: 1136px;
    padding: 0px 48px;
`;

const BadgeWrapper = styled(Badge)`
    & .MuiBadge-badge {
        right: 35px;
        top: 15px;
        color: #ffffff;
        font-size: 11px;
        font-weight: bolder;
        padding-top: 1px;
    }
`;

const MenuWrapper = styled(Menu)`
    & .MuiMenu-paper {
        top: 80px !important;
        right: 140px;
        width: 300px;
        max-height: 400px;
        left: auto !important;
        position: fixed;
        padding: 0px 15px 15px 10px;
        box-sizing: border-box;
    }
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: ${(props) => props.margin};
`;

const ButtonWrapper = styled(Button)`
    width: fit-content;
    padding: 0px 15px;
    font-size: 10px;
    height: 20px;
    float: right;
`;

const Layout = ({ children }) => {
    const { currency, loading: dataLoading } = useDataState();
    const { loading: userLoading, cart } = useUserState();
    const { dispatch } = useDataDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();

    const handleViewCart = (e) => {
        if (cart.length > 0) {
            setShowCart(true);
            setAnchorEl(e.currentTarget);
        }
    };

    const handleSelectArtistAndShop = (artist, shop) => {
        dispatch({ type: "SET_ARTIST_AND_SHOP", payload: { artist, shop } });
        setIsOpen(false);
    };

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
                            <img src="/images/menu.svg" alt="Menu" />
                        </IconButton>
                        <Icon
                            margin="0px 0px 0px 16px"
                            src="/images/weverse-shop.png"
                            alt="Weverse Shop"
                            onClick={() => history.push("/")}
                        />
                    </Group>
                    <Group>
                        <Icon
                            src="/images/account.svg"
                            margin="0px 5px 0px 0px"
                            alt="Account"
                        />
                        <BadgeWrapper
                            color="primary"
                            badgeContent={getCartProductCount(cart)}
                        >
                            <Icon
                                src="/images/cart.svg"
                                width={45}
                                margin="10px 25px 0px 25px"
                                onClick={handleViewCart}
                                alt="Cart"
                            />
                        </BadgeWrapper>
                        <Icon
                            margin="0px 25px 0px 0px"
                            src="/images/notifications.svg"
                            alt="Notifications"
                        />
                        <Icon
                            src="/images/settings.svg"
                            onClick={() => history.push("/settings")}
                            alt="Settings"
                        />
                    </Group>
                </ToolbarWrapper>
                <MenuWrapper
                    keepMounted
                    open={showCart}
                    anchorEl={anchorEl}
                    onClose={(e) => setShowCart(false)}
                >
                    {cart.map((product) => (
                        <FlexWrapper margin="0px 0px 5px" key={product.id}>
                            <FlexWrapper>
                                <img
                                    src={product.product.displayPic}
                                    width={50}
                                    alt="Item"
                                />
                                <div>
                                    <Text
                                        fontSize="12"
                                        fontWeight="bold"
                                        margin="0px 0px 0px 10px"
                                    >
                                        {product.product.name}
                                    </Text>
                                    <Text
                                        fontSize="12"
                                        fontWeight="bold"
                                        color="rgb(173, 177, 184)"
                                        margin="0px 0px 0px 10px"
                                    >
                                        x{product.qty}
                                    </Text>
                                </div>
                            </FlexWrapper>
                            <Text
                                fontSize="12"
                                fontWeight="bold"
                                color="rgb(11 191 161)"
                                width="75px"
                                textAlign="right"
                            >
                                {convertPrice(
                                    product.product.price * product.qty,
                                    currency
                                )}
                            </Text>
                        </FlexWrapper>
                    ))}
                    <ButtonWrapper onClick={() => history.push("/cart")}>
                        Checkout
                    </ButtonWrapper>
                </MenuWrapper>
            </AppBar>

            {userLoading || dataLoading ? (
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
                                fontSize="13"
                                fontWeight="bold"
                                color="rgb(173, 177, 184)"
                            >
                                Artists
                            </Text>
                            <ArtistList
                                handleSelectArtistAndShop={
                                    handleSelectArtistAndShop
                                }
                            />
                        </>
                    </DrawerWrapper>
                </Body>
            )}
        </>
    );
};

export default Layout;
