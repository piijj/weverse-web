import React from "react";
import { Chip } from "@material-ui/core";
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

const Shop = styled.div`
    width: 100px;
    display: flex;
    align-items: center;
`;

const ChipWrapper = styled(Chip)`
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    font-weight: bold;
    margin-left: 10px;
`;

const Layout = () => {
    const { artist, shop } = useDataState();
    return (
        <Shop>
            <Text
                fontFamily="Noto Sans KR, sans-serif"
                fontSize="30"
                fontWeight="bold"
                letterSpacing="-0.5px"
            >
                {artist.name}
            </Text>
            <ChipWrapper size="small" label={shop.name} />
        </Shop>
    );
};

export default Layout;
