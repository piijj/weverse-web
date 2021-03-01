import React, { useState } from "react";
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
    margin: ${(props) => props.margin};
`;

const CheckCircleIcon = styled(CheckCircle)`
    ${({ theme }) => `
            color: ${theme.palette.primary.main};
    transform: scale(1.1);
            `}
`;

const UncheckedCircleIcon = styled(CheckCircle)`
    color: rgb(235, 235, 235);
    transform: scale(1.1);
`;

const AllWrapper = styled.div`
    background-color: rgb(250, 251, 252);
    border-radius: 2px;
    padding: 8px 0px;
`;

const FormLabel = styled(FormControlLabel)`
    padding: 8px 8px;
`;

const TermsAndConditions = ({ updateDetails }) => {
    const [checked, setChecked] = useState([]);

    const updateChecked = (e) => {
        if (e) {
            const isChecked = checked.findIndex((i) => i === e.target.name);
            if (isChecked >= 0) {
                setChecked(checked.filter((item) => item !== e.target.name));
            } else {
                setChecked([...checked, e.target.name]);
            }
        } else {
            checked.length === 3 ? setChecked([]) : setChecked(["1", "2", "3"]);
        }
    };
    return (
        <>
            <AllWrapper>
                <FormLabel
                    control={
                        <Checkbox
                            icon={<UncheckedCircleIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            onChange={() => updateChecked()}
                        />
                    }
                    label={
                        <Text fontWeight={600} fontSize={18}>
                            I Agree to All.
                        </Text>
                    }
                />
            </AllWrapper>
            <FormLabel
                control={
                    <Checkbox
                        icon={<UncheckedCircleIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        name="1"
                        checked={checked.findIndex((c) => c === "1") > -1}
                        onChange={updateChecked}
                    />
                }
                label={
                    <Text>
                        I agree to the Weverse Account Terms of Use (Required)
                    </Text>
                }
            />
            <FormLabel
                control={
                    <Checkbox
                        icon={<UncheckedCircleIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        name="2"
                        checked={checked.findIndex((c) => c === "2") > -1}
                        onChange={updateChecked}
                    />
                }
                label={
                    <Text>
                        I agree to the collection and usage of personal
                        information (Required)
                    </Text>
                }
            />
            <FormLabel
                control={
                    <Checkbox
                        icon={<UncheckedCircleIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        name="3"
                        checked={checked.findIndex((c) => c === "3") > -1}
                        onChange={updateChecked}
                    />
                }
                label={<Text>I’m Over 14 Years Old. (Required)</Text>}
            />
            <ButtonWrapper
                margin="8px 0px 0px"
                disabled={checked.length < 3}
                onClick={() => updateDetails({})}
            >
                Next
            </ButtonWrapper>
        </>
    );
};

export default TermsAndConditions;
