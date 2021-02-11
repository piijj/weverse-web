import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuthDispatch } from "../context/AuthContext";
import { ArrowBackRounded } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import UserInformationForm from "../components/Signup/UserDetails";
import PasswordForm from "../components/Signup/PasswordForm";
import EmailForm from "../components/Signup/EmailForm";
import TermsAndConditions from "../components/Signup/TermsAndConditions";
import EmailVerification from "../components/Signup/EmailVerification";

const descriptions = [
    "Enter an email to use for your Weverse Account.",
    "Create a password.",
    "Enter your information for Weverse Account.",
    "Please agree to the Weverse Account terms and conditions.",
    "Verify your email to finish signing up.",
];

const Wrapper = styled.div`
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(245, 247, 250);
    border-radius: 8px;
    padding: 0px 48px;
    width: 496px;
    margin: 104px auto;
    box-sizing: border-box;
`;

const Title = styled.div`
    text-align: left;
    margin: 32px 0px;
`;

const Logo = styled.img`
    width: 184px;
    text-align: center;
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
`;

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin};
`;

const ButtonWrapper = styled(Button)`
    margin: ${(props) => props.margin}!important;
`;

const TextWrapper = styled.div`
    margin: ${(props) => props.margin};
    display: block;
    text-align: center;
`;

const Line = styled.div`
    border-bottom: 1px solid rgb(228, 230, 234);
    width: 105px;
    margin-bottom: 8px;
`;

const Divider = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
`;

const Icons = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 32px;
`;

const Icon = styled.img`
    height: 48px;
    cursor: pointer;
    margin: 0px 16px;
`;

const Link = styled.span`
    color: rgb(10, 219, 184);
    cursor: pointer;
    font-weight: bold;
`;

const BackButton = styled.div`
    margin: 30px 0px;
    display: flex;
    width: fit-content;
`;

const BackIcon = styled(ArrowBackRounded)`
    color: rgb(135, 142, 150);
`;

const SignupWithEmail = ({ signUpWithEmail }) => {
    const { userRegister } = useAuthDispatch();
    const [step, setStep] = useState(1);
    const [userDetails, setUserDetails] = useState({ email: "" });

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            signUpWithEmail(false);
        }
    };

    const updateDetails = (values) => {
        if (step === 4) {
            handleRegisterUser();
        } else {
            setUserDetails({ ...userDetails, ...values });
            setStep(step + 1);
        }
    };

    const handleRegisterUser = async () => {
        await userRegister(userDetails);
        await setStep(step + 1);
    };

    return (
        <Wrapper>
            <Title>
                <LogoWrapper>
                    <Logo src="/images/weverse-account.svg" />
                    <Text fontSize={14} margin={"4px 0px 0px 8px"}>
                        STEP {step} out of 5
                    </Text>
                </LogoWrapper>
                <Text fontSize={32} fontWeight="bold">
                    {descriptions[step - 1]}
                </Text>
            </Title>
            {step === 1 ? (
                <EmailForm updateDetails={updateDetails} />
            ) : step === 2 ? (
                <PasswordForm updateDetails={updateDetails} />
            ) : step === 3 ? (
                <UserInformationForm updateDetails={updateDetails} />
            ) : step === 4 ? (
                <TermsAndConditions updateDetails={updateDetails} />
            ) : (
                <EmailVerification userDetails={userDetails} />
            )}
            <BackButton onClick={handleBack}>
                <BackIcon fontSize="small" />
                &nbsp;&nbsp;<Text color="rgb(135, 142, 150)">Back</Text>
            </BackButton>
        </Wrapper>
    );
};

const Signup = () => {
    const { userLoginWithSocialMedia } = useAuthDispatch();
    const [withEmail, signUpWithEmail] = useState(false);
    const history = useHistory();

    return withEmail ? (
        <SignupWithEmail signUpWithEmail={signUpWithEmail} />
    ) : (
        <Wrapper>
            <Title>
                <LogoWrapper>
                    <Logo src="/images/weverse-account.svg" />
                </LogoWrapper>
                <Text fontSize={32} fontWeight="bold" lineHeight={1.4}>
                    With Weverse Account, you can enjoy Weverse Shop, Weverse,
                    and much more!
                </Text>
            </Title>
            <ButtonWrapper
                margin="72px 0px 56px"
                onClick={() => signUpWithEmail(true)}
            >
                Continue with Email
            </ButtonWrapper>
            <Divider>
                <Line />
                <Text color="rgb(135, 142, 150)" fontSize={14}>
                    Continue with Social Media
                </Text>
                <Line />
            </Divider>
            <Icons>
                <Icon
                    src="/images/twitter.svg"
                    onClick={() => userLoginWithSocialMedia("twitter")}
                />
                <Icon
                    src="/images/google.svg"
                    onClick={() => userLoginWithSocialMedia("google")}
                />
                <Icon
                    src="/images/facebook.svg"
                    onClick={() => userLoginWithSocialMedia("facebook")}
                />
            </Icons>
            <TextWrapper margin="0px 0px 65px">
                <Text color="rgb(135, 142, 150)" fontSize={14}>
                    Already have an account with us?{" "}
                </Text>
                <Text color="rgb(135, 142, 150)" fontSize={14}>
                    Simply{" "}
                    <Link onClick={() => history.push("/login")}>Log In</Link> !
                </Text>
            </TextWrapper>
        </Wrapper>
    );
};

export default Signup;
