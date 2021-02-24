import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useUserDispatch } from "../../context/UserContext";

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

const EmailVerification = ({ userDetails }) => {
    const { resendEmailVerification } = useUserDispatch();
    return (
        <>
            <Text fontSize={16} margin="0px 0px 8px">
                We just sent you a verification email to {userDetails.email}
                &nbsp; Please click 'Verify Email' in our email to create your
                account.
            </Text>
            <Text
                color="rgb(135, 142, 150)"
                margin="16px 0px 24px"
                fontSize={14}
            >
                Didn’t get the email?{" "}
                <Link onClick={resendEmailVerification}>Resend email</Link>
            </Text>
            <ButtonWrapper>Close</ButtonWrapper>
            <Image src="/images/email-verify.png" />
        </>
    );
};

export default EmailVerification;
