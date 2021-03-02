import React from "react";
import styled from "styled-components";
import { Checkbox, FormControlLabel, Button } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin};
`;

const ButtonWrapper = styled(Button)`
    margin: 10px 0px 0px;
    height: 30px;
`;

const CheckCircleIcon = styled(CheckCircle)`
    ${({ theme }) => `
        color: ${theme.palette.primary.main};
        transform: scale(0.8);
    `}
`;

const UncheckedCircleIcon = styled(CheckCircle)`
    color: rgb(235, 235, 235);
    transform: scale(0.8);
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ShippingOption = ({ setActive, shipToSK, details }) => {
    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        icon={<UncheckedCircleIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        checked={true}
                    />
                }
                label={
                    <div>
                        <Flex>
                            <Text color="#0BE6C1">
                                {shipToSK
                                    ? "CJ 대한 통운"
                                    : "International Shipping Fee"}
                            </Text>
                            <Text color="#0BE6C1">
                                ₩{shipToSK ? "0" : "26,787"}
                            </Text>
                        </Flex>
                        <Text color="rgb(173, 177, 184)">{details}</Text>
                    </div>
                }
            />
            <ButtonWrapper onClick={() => setActive(0)}>Save</ButtonWrapper>
        </>
    );
};

export default ShippingOption;
