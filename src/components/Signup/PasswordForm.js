import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { InputAdornment, IconButton, OutlinedInput } from "@material-ui/core";
import { Error, VisibilityOff, Visibility } from "@material-ui/icons";
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

    const Password = ({ prop, placeholder, handleChange, value }) => (
        <Field
            type={showPassword[prop] ? "text" : "password"}
            onChange={handleChange}
            value={value}
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
            inputProps={{ style: { height: "10px" } }}
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
                        .min(8, "Must be more than 8 characters"),
                    // .matches(
                    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{8,}$/,
                    //   "Password should not have special characters"
                    // ),
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
                {({ handleSubmit, handleChange, errors, touched, values }) => (
                    <>
                        <Password
                            prop="password"
                            placeholder="Password"
                            handleChange={handleChange}
                            value={values.password}
                        />
                        <ErrorMessage>
                            {errors.password && touched.password && (
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
                        />
                        <ErrorMessage>
                            {errors.passwordConfirmation &&
                                touched.passwordConfirmation && (
                                    <>
                                        <ErrorIcon fontSize="small" />
                                        &nbsp;&nbsp;
                                        {errors.passwordConfirmation}
                                    </>
                                )}
                        </ErrorMessage>
                        <Button
                            margin="8px 0px 0px"
                            onClick={handleSubmit}
                            disabled={errors.email ? true : false}
                        >
                            Next
                        </Button>
                    </>
                )}
            </Formik>
        </>
    );
};

export default PasswordForm;
