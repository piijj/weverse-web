import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useUserState } from "../../context/UserContext";
import { convertPrice } from "../../utils";
import { useDataState } from "../../context/DataContext";
import moment from "moment";

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


const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: ${(props) => props.margin};
`;

const OrderWrapper = styled.div`
    background: #e9eaea;
    padding: 10px 10px 25px;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const ButtonWrapper = styled(Button)`
height: 16px;
font-size: 9px;
width: fit-content;
border-radius: 2px;
line-height: 0px;
padding: 5px 5px 3px;
float: right;
`

const OrderList = () => {
    const { orders } = useUserState();
    const { currency } = useDataState();
    console.log(orders);
    return (
        <>
            {orders.map((order) => (
                <OrderWrapper>
                    <Text fontSize={14} margin="0px 0px 5px 0px">
                        Shipping{" "}
                        {order.shippedDate === "soon"
                            ? order.shippedDate
                            : `on ${moment(order.shippedDate).format("DD/MM/YYYY")}`}
                    </Text>
                    {order.items.map((item) => (
                        <FlexWrapper margin="0px 0px 5px" key={item.id}>
                            <FlexWrapper>
                                <img
                                    src={item.product.displayPic}
                                    width={50}
                                    alt="Item"
                                />
                                <div>
                                    <Text
                                        fontSize="12"
                                        fontWeight="bold"
                                        margin="0px 0px 0px 10px"
                                    >
                                        {item.product.name}
                                    </Text>
                                    <Text
                                        fontSize="12"
                                        fontWeight="bold"
                                        color="rgb(173, 177, 184)"
                                        margin="0px 0px 0px 10px"
                                    >
                                        x{item.qty}
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
                                    item.product.price * item.qty,
                                    currency
                                )}
                            </Text>
                        </FlexWrapper>
                    ))}
                    <ButtonWrapper>View Order Details</ButtonWrapper>
                </OrderWrapper>
            ))}
        </>
    );
};

export default OrderList;
