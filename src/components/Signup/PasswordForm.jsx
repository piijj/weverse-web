import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import {
    InputAdornment,
    IconButton,
    OutlinedInput,
    Button,
} from "@material-ui/core";
import { Error, VisibilityOff, Visibility } from "@material-ui/icons";
import * as Yup from "yup";

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

const PasswordForm = ({ updateDetails }) => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        passwordConfirmation: false,
    });

    const Password = ({ prop, placeholder, handleChange, value, error }) => (
        <OutlinedInput
            type={showPassword[prop] ? "text" : "password"}
            onChange={handleChange}
            value={value}
            error={error}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        onClick={() =>
                            setShowPassword({
                                ...showPassword,
                                [prop]: !showPassword[prop],
                            })
                        }
                        edge="end"
                    >
                        {showPassword[prop] ? (
                            <Visibility />
                        ) : (
                            <VisibilityOff />
                        )}
                    </IconButton>
                </InputAdornment>
            }
            name={prop}
            placeholder={placeholder}
        />
    );
    return (
        <>
            <Text fontSize={16} margin="0px 0px 8px">
                Password
            </Text>
            <Text color="rgb(135, 142, 150)" margin="0px 0px 8px">
                Your password must have 8 to 32 alphanumeric characters, with at
                least 1 number and 1 special character.
            </Text>
            <Formik
                validateOnMount={false}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .required("Required")
                        .min(8, "Must be more than 8 characters")
                        .matches(
                            /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
                            "Password should have atleast 1 number and 1 special character"
                        ),
                    passwordConfirmation: Yup.string()
                        .required("Required")
                        .oneOf(
                            [Yup.ref("password"), null],
                            "Password must match"
                        ),
                })}
                initialValues={{ password: "", passwordConfirmation: "" }}
                onSubmit={(values) => {
                    updateDetails({ password: values.password });
                }}
            >
                {({ handleSubmit, handleChange, errors, values }) => (
                    <>
                        <Password
                            prop="password"
                            placeholder="Password"
                            handleChange={handleChange}
                            value={values.password}
                            error={!!errors.password}
                        />
                        <ErrorMessage>
                            {errors.password && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;{errors.password}
                                </>
                            )}
                        </ErrorMessage>
                        <Password
                            prop="passwordConfirmation"
                            placeholder="Confirm password"
                            handleChange={handleChange}
                            value={values.passwordConfirmation}
                            error={!!errors.passwordConfirmation}
                        />
                        <ErrorMessage>
                            {errors.passwordConfirmation && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;
                                    {errors.passwordConfirmation}
                                </>
                            )}
                        </ErrorMessage>
                        <ButtonWrapper
                            margin="8px 0px 0px"
                            onClick={handleSubmit}
                            disabled={
                                !!(
                                    errors.password ||
                                    errors.passwordConfirmation
                                )
                            }
                        >
                            Next
                        </ButtonWrapper>
                    </>
                )}
            </Formik>
        </>
    );
};

export default PasswordForm;
