import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { OutlinedInput } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import * as Yup from "yup";

const Field = styled(OutlinedInput)`
    display: block;
    color: rgb(32, 36, 41);
    width: 100%;
    background-image: none;
    background-color: rgb(255, 255, 255);
    font-size: 16px;
    border-radius: 4px;
    word-break: break-all;

    & .MuiOutlinedInput-root {
        &.Mui-focused fieldset {
            border: 1px solid rgb(11, 230, 193);
        }
    }
`;

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin};
`;

const Button = styled.button`
    appearance: none;
    background: ${(props) =>
        props.disabled ? "rgb(228, 230, 234)" : "rgb(11, 230, 193)"};
    outline: none;
    border-radius: 4px;
    border: ${(props) =>
        props.disabled
            ? "1px solid rgb(228, 230, 234)"
            : "1px solid rgb(11, 230, 193)"};
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: inline-block;
    font-size: 17px;
    font-weight: 700;
    width: 100%;
    height: 52px;
    line-height: 50px;
    padding: 0px 12px;
    text-align: center;
    transition: all 0.5s ease-out 0s;
    margin: ${(props) => props.margin};
`;

const Link = styled.span`
    color: rgb(10, 219, 184);
    cursor: pointer;
    font-weight: bold;
`;

const Image = styled.img`
    width: 300px;
    margin: 24px auto 52px;
    display: block;
`;

const EmailVerification = ({ userDetails }) => (
    <>
        <Text fontSize={16} margin="0px 0px 8px">
            We just sent you a verification email to {userDetails.email}
            Please click 'Verify Email' in our email to create your account.
        </Text>
        <Text color="rgb(135, 142, 150)" margin="16px 0px 24px" fontSize={14}>
            Didn’t get the email? <Link>Resend email</Link>
        </Text>
        <Button>Close</Button>
        <Image src="/images/email-verify.png" />
    </>
);

export default EmailVerification;
