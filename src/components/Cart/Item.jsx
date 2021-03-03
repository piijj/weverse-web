import React, { useState } from "react";
import { Grid, Checkbox } from "@material-ui/core";
import { AddCircle, RemoveCircle, CheckCircle } from "@material-ui/icons";
import styled from "styled-components";
import { useUserDispatch } from "../../context/UserContext";
import { convertPrice } from "../../utils";
import { useDataState } from "../../context/DataContext";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight};
    margin: ${(props) => props.margin};
    letter-spacing: ${(props) => props.letterSpacing};
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: ${(props) => props.margin};
    height: 100%;
    flex-direction: ${(props) => props.direction};
    justify-content: ${(props) => props.justify};
`;

const QtyWrapper = styled.div`
    margin: 10px 30px;
    display: flex;
    align-items: center;
    width: 80px;
`;

const CheckCircleIcon = styled(CheckCircle)`
    ${({ theme }) => `
            color: ${theme.palette.primary.main};
    `}
`;

const UncheckedCircleIcon = styled(CheckCircle)`
    color: rgb(235, 235, 235);
`;

const ItemButton = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;
`;

const Item = ({ product, checked, updateChecked }) => {
    const { currency } = useDataState();
    const { handleRemoveFromCart, handleUpdateCart } = useUserDispatch();
    const [qty, setQty] = useState(product.qty);
    return (
        <FlexWrapper margin="0px 0px 5px">
            <Grid container>
                <Grid item xs>
                    <FlexWrapper>
                        <Checkbox
                            icon={<UncheckedCircleIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            checked={checked.includes(product.id)}
                            onChange={() => updateChecked(product.id)}
                        />
                        <img
                            src={product.product.displayPic}
                            width={75}
                            alt={product.product.name}
                        />
                        <div>
                            <Text
                                fontSize="16"
                                fontWeight="bold"
                                margin="0px 0px 0px 10px"
                            >
                                {product.product.name}
                            </Text>
                        </div>
                    </FlexWrapper>
                </Grid>
                <Grid item xs={3}>
                    <FlexWrapper>
                        <QtyWrapper>
                            <AddCircle
                                color={
                                    product.product.maxQtyPerOrder > qty
                                        ? "primary"
                                        : "disabled"
                                }
                                onClick={() =>
                                    product.product.maxQtyPerOrder > qty &&
                                    setQty(qty + 1)
                                }
                            />
                            <Text fontSize={16} margin="0px 10px">
                                {qty}
                            </Text>
                            <RemoveCircle
                                color={qty > 1 ? "primary" : "disabled"}
                                onClick={() => qty > 1 && setQty(qty - 1)}
                            />
                        </QtyWrapper>
                    </FlexWrapper>
                </Grid>
                <Grid item xs={2}>
                    <FlexWrapper>
                        <Text
                            fontSize="16"
                            fontWeight="bold"
                            color="rgb(11 191 161)"
                        >
                            {convertPrice(
                                product.product.price * product.qty,
                                currency
                            )}
                        </Text>
                    </FlexWrapper>
                </Grid>
                <Grid item>
                    <FlexWrapper direction="column" justify="center">
                        <ItemButton
                            onClick={() => handleRemoveFromCart(product.id)}
                        >
                            <img
                                src="/images/delete.svg"
                                width={15}
                                alt="Delete"
                            />
                            &nbsp;<Text>Delete</Text>
                        </ItemButton>
                        {product.qty !== qty && (
                            <ItemButton
                                onClick={() =>
                                    handleUpdateCart({ id: product.id, qty })
                                }
                            >
                                <img
                                    src="/images/update.svg"
                                    width={15}
                                    alt="Update"
                                />
                                &nbsp;<Text>Update</Text>
                            </ItemButton>
                        )}
                    </FlexWrapper>
                </Grid>
            </Grid>
        </FlexWrapper>
    );
};

export default Item;
