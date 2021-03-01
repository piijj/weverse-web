import React from "react";
import { Button, FormControl, TextField } from "@material-ui/core";
import { Formik } from "formik";
import { Error } from "@material-ui/icons";
import * as Yup from "yup";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "./style.css";
import { useUserDispatch, useUserState } from "../../context/UserContext";

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

const ButtonWrapper = styled(Button)`
    margin: ${(props) => props.margin};
    height: 30px;
`;

const ShopperDetailsForm = ({ setActive }) => {
    const { user, address } = useUserState();
    const { dispatch } = useUserDispatch();

    const handleLoadShippingDetails = (setFieldValue) => {
        setFieldValue("firstName", address.firstName, false);
        setFieldValue("lastName", address.lastName, false);
        setFieldValue("mobileNumber", address.mobileNumber, false);
        setFieldValue("country", address.country, false);
    };

    const handleSaveDetails = (values, setActive) => {
        dispatch({
            type: "SET_SHOPPER_DETAILS",
            payload: { ...values, email: user.email },
        });
        setActive(0);
    };

    return (
        <Formik
            validateOnMount={false}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().required("Required"),
                lastName: Yup.string().required("Required"),
                mobileNumber: Yup.string().required("Required"),
            })}
            initialValues={{
                firstName: "",
                lastName: "",
                country: { value: "ph" },
                mobileNumber: "+63",
            }}
            onSubmit={(values) => handleSaveDetails(values, setActive)}
        >
            {({
                handleSubmit,
                handleChange,
                setFieldValue,
                errors,
                values,
            }) => (
                <>
                    {address && (
                        <ButtonWrapper
                            margin="0px 0px 10px"
                            onClick={() =>
                                handleLoadShippingDetails(setFieldValue)
                            }
                        >
                            Load Same Info from Shipping Address
                        </ButtonWrapper>
                    )}
                    <FormControl style={{ width: "100%" }}>
                        <TextField
                            variant="outlined"
                            name="firstName"
                            onChange={handleChange}
                            error={!!errors.firstName}
                            label="First Name"
                            value={values.firstName}
                        />
                        <ErrorMessage>
                            {errors.firstName && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;Please enter first name.
                                </>
                            )}
                        </ErrorMessage>
                    </FormControl>
                    <FormControl style={{ width: "100%" }}>
                        <TextField
                            variant="outlined"
                            name="lastName"
                            onChange={handleChange}
                            error={!!errors.lastName}
                            label="Last Name"
                            value={values.lastName}
                        />
                        <ErrorMessage>
                            {errors.lastName && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;Please enter last name.
                                </>
                            )}
                        </ErrorMessage>
                    </FormControl>
                    <FormControl style={{ width: "100%" }}>
                        <TextField
                            variant="outlined"
                            name="email"
                            label="Email"
                            value={user.email}
                        />
                        <ErrorMessage />
                    </FormControl>
                    <FormControl style={{ width: "100%" }}>
                        <PhoneInput
                            placeholder="Enter you mobile number"
                            name="mobileNumber"
                            value={values.mobileNumber}
                            onChange={(phone) =>
                                setFieldValue("mobileNumber", phone)
                            }
                        />
                    </FormControl>
                    <ButtonWrapper
                        margin="8px 0px 0px"
                        onClick={handleSubmit}
                        disabled={!!errors.email}
                    >
                        Save
                    </ButtonWrapper>
                </>
            )}
        </Formik>
    );
};
export default ShopperDetailsForm;
