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
    Badge,
    Menu,
    Button,
} from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDataState, useDataDispatch } from "../../context/DataContext";
import Spinner from "../shared/Spinner";
import { useUserState } from "../../context/UserContext";
import { getCartProductCount } from "../../utils";

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
    const {
        artists,
        shops,
        artist,
        shop,
        loading: dataLoading,
    } = useDataState();
    const { loading: userLoading, cart } = useUserState();
    const { handleSelectArtist, handleSelectShop } = useDataDispatch();
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
                            onClick={() => history.push("/add")}
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
                            >
                                {" "}
                                ₩
                                {(
                                    product.product.price * product.qty
                                ).toLocaleString()}
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
                            {artists.map((data, index) => (
                                <div key={data.id}>
                                    <ArtistWrapper
                                        key={index}
                                        onClick={() => handleSelectArtist(data)}
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
