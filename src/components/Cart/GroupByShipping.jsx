import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { CheckCircle, LocalShipping } from "@material-ui/icons";
import styled from "styled-components";
import moment from "moment";
import Item from "./Item";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight};
    margin: ${(props) => props.margin};
    letter-spacing: ${(props) => props.letterSpacing};
`;

const CheckCircleIcon = styled(CheckCircle)`
    ${({ theme }) => `
            color: ${theme.palette.primary.main};
    `}
`;

const UncheckedCircleIcon = styled(CheckCircle)`
    color: rgb(235, 235, 235);
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Group = styled.div`
    margin-bottom: 30px;
`;

const GroupByShipping = ({ products, shippingDate, checked, setChecked }) => {
    const allIds = products.map((c) => c.id);
    const checkedAll = allIds.every((i) => checked.includes(i));

    const updateChecked = (id) => {
        const isChecked = checked.findIndex((i) => i === id);
        if (isChecked >= 0) {
            setChecked(checked.filter((item) => item !== id));
        } else {
            setChecked([...checked, id]);
        }
    };

    return (
        <Group>
            <Flex>
                <FormControlLabel
                    control={
                        <Checkbox
                            icon={<UncheckedCircleIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            checked={checkedAll}
                            onChange={() =>
                                setChecked(
                                    checkedAll
                                        ? checked.filter(
                                              (c) => !allIds.includes(c)
                                          )
                                        : [...checked, ...allIds]
                                )
                            }
                        />
                    }
                    label={
                        <Text fontSize={18} color="rgb(173, 177, 184)">
                            Select All
                        </Text>
                    }
                />
                <Flex>
                    <LocalShipping color="primary" />
                    &nbsp;
                    <Text fontSize={14}>
                        Shipping{" "}
                        {shippingDate === "soon"
                            ? shippingDate
                            : `on ${moment(shippingDate).format("DD/MM/YYYY")}`}
                    </Text>
                </Flex>
            </Flex>
            {products.map((product) => (
                <Item
                    product={product}
                    checked={checked}
                    updateChecked={updateChecked}
                    key={product.id}
                />
            ))}
        </Group>
    );
};

export default GroupByShipping;
