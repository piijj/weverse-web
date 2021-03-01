import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useDataState } from "../../context/DataContext";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: Noto Sans KR, sans-serif;
    font-weight: ${(props) => props.fontWeight || "normal"};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin || "10px 0px"};
    text-align: ${(props) => props.textAlign};
`;

const Notice = styled.div`
    border: 5px solid #bdc0c5;
    padding: 10px;
    margin: 50px 30px;
    border-radius: 10px;
`;

const Bullet = styled.div`
    display: flex;
    align-items: flex-start;
`;

const Circle = styled.div`
    color: red;
    margin: ${(props) => props.margin || "20px 5px 0px 5px"};
    background: ${(props) => props.color || "red"};
    width: ${(props) => props.size || "3px"};
    height: ${(props) => props.size || "3px"};
    border-radius: 50%;
    display: inline-table;
`;

const NoticePanel = () => {
    const { product, shop } = useDataState();

    return (
        <Notice>
            {product.isPreorder && shop.name === "Global" && (
                <Bullet>
                    <Circle />
                    <Text fontSize={16} color="#878E96">
                        Pre-order:{" "}
                        {moment(product.preorderStartDate).format(
                            "D MMMM, h A"
                        )}{" "}
                        ~{" "}
                        {moment(product.preorderEndDate).format("D MMMM, h A")}{" "}
                        (KST)
                    </Text>
                </Bullet>
            )}
            {product.preorderGift && shop.name === "Global" && (
                <Bullet>
                    <Circle />
                    <Text fontSize={16} color="#878E96">
                        {product.name} comes with{" "}
                        {product.preorderGift.join(" and ")}.
                    </Text>
                </Bullet>
            )}
            {product.category === "ALBUM" && shop.name === "Global" && (
                <>
                    <Bullet>
                        <Circle />
                        <Text fontSize={16} color="#878E96">
                            All sales from Weverse Shop Global will count for
                            the album charts in South Korea
                        </Text>
                    </Bullet>
                    <Bullet>
                        <Circle />
                        <Text fontSize={16} color="#878E96">
                            Please visit Weverse Shop USA if you are a customer
                            in the US. US customers cannot purchase this.
                        </Text>
                    </Bullet>
                    <Bullet>
                        <Circle />
                        <Text fontSize={16} color="#878E96">
                            This album will be shipped out from Korea. The
                            international shipping fee will be charged
                            separately.
                        </Text>
                    </Bullet>
                </>
            )}
            <Bullet>
                <Circle />
                <Text fontSize={16} color="#878E96">
                    You can buy up to {product.maxQtyPerOrder}.
                </Text>
            </Bullet>
            {shop.name === "Global" && (
                <Bullet>
                    <Circle />
                    <Text fontSize={16} color="#878E96">
                        As more countries/regions are experiencing shipping
                        delays and imposing shipping restrictions due to
                        COVID-19, shipping to the country/region you selected
                        may be unavailable. Please check the announcement on
                        shipping delay and restriction. We will do our best to
                        resume shipping as soon as possible
                    </Text>
                </Bullet>
            )}
        </Notice>
    );
};

export default NoticePanel;
