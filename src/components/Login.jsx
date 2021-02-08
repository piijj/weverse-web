import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { useAuthDispatch } from "../context/AuthContext";
import { TextField } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import * as Yup from "yup";

const Wrapper = styled.div`
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(245, 247, 250);
    border-radius: 8px;
    padding: 0px 48px;
    width: 480px;
    margin: 104px auto;
    box-sizing: border-box;
`;

const Title = styled.div`
    text-align: center;
    margin: 56px 0px 26px 0px;
`;

const Logo = styled.img`
    width: 220px;
    margin-bottom: 8px;
    text-align: center;
`;

const Field = styled(TextField)`
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
    font-size: ${(props) => props.fontSize}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight};
`;

const Button = styled.button`
    margin: "26px 0px 0px";
    appearance: none;
    background: none rgb(11, 230, 193);
    outline: none;
    border-radius: 4px;
    border: 1px solid rgb(11, 230, 193);
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
`;

const ErrorIcon = styled(Error)`
    color: rgb(235, 69, 90);
    font-size: 16;
`;

const ErrorMessage = styled.div`
    display: flex;
    color: rgb(235, 69, 90);
    font-size: 14px;
    margin: 8px 0px;
    align-items: center;
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
    color: ${(props) => props.color};
    cursor: pointer;
`;

const loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
});

const Login = () => {
    const { userLogin, userLoginWithSocialMedia } = useAuthDispatch();
    const history = useHistory();

    return (
        <Wrapper>
            <Title>
                <Logo src="/images/weverse-account.svg" />
                <Text fontSize={32} fontWeight="bold" lineHeight={1.4}>
                    Log In
                </Text>
            </Title>
            <Formik
                validateOnMount={false}
                validationSchema={loginSchema}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, actions) => {
                    userLogin(
                        values.email,
                        values.password,
                        actions.setSubmitting
                    );
                }}
            >
                {({
                    isSubmitting,
                    handleSubmit,
                    handleChange,
                    errors,
                    values,
                    touched,
                }) => (
                    <>
                        <Field
                            placeholder="Weverse Account (email)"
                            variant="outlined"
                            name="email"
                            onChange={handleChange}
                            inputProps={{ style: { height: "10px" } }}
                        />
                        <ErrorMessage>
                            {errors.email && touched.email && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;Please enter valid Email.
                                </>
                            )}
                        </ErrorMessage>
                        <Field
                            placeholder="Password"
                            variant="outlined"
                            name="password"
                            onChange={handleChange}
                            inputProps={{ style: { height: "10px" } }}
                        />
                        <ErrorMessage>
                            {errors.password && touched.password && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;Enter password
                                </>
                            )}{" "}
                        </ErrorMessage>
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                            Log In
                        </Button>
                    </>
                )}
            </Formik>
            <TextWrapper margin="32px 0px 35px">
                <Text
                    color="rgb(10, 219, 184)"
                    fontSize={14}
                    lineHeight={1.4}
                    fontWeight="bold"
                >
                    Forgot Password?
                </Text>
            </TextWrapper>
            <TextWrapper margin="0px 0px 48px">
                <Text color="rgb(189, 192, 197)" fontSize={12} lineHeight={1.4}>
                    With Weverse Account, you can enjoy Weverse Shop, Weverse,
                    and much more!
                </Text>
            </TextWrapper>
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
                    Don't have an account with us yet?
                </Text>
                <Text color="rgb(10, 219, 184)" fontWeight="bold" fontSize={14}>
                    <Link onClick={() => history.push("/signup")}>
                        Create a Weverse Account
                    </Link>
                </Text>
            </TextWrapper>
        </Wrapper>
    );
};

export default Login;
