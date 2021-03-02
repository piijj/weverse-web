import React from "react";
import {
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
} from "@material-ui/core";
import { Formik } from "formik";
import { Error } from "@material-ui/icons";
import * as Yup from "yup";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "./style.css";
import countries from "../../utils/countries";
import { useUserDispatch } from "../../context/UserContext";

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

const ShippingAddressForm = ({ setActive, setAddAddress }) => {
    const { handleAddAddress } = useUserDispatch();
    return (
        <Formik
            validateOnMount={false}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().required("Required"),
                lastName: Yup.string().required("Required"),
                country: Yup.object().required("Required"),
                address: Yup.string().required("Required"),
                city: Yup.string().required("Required"),
                state: Yup.string().required("Required"),
                postalCode: Yup.string().required("Required"),
                mobileNumber: Yup.string().required("Required"),
            })}
            initialValues={{ country: { value: "ph" } }}
            onSubmit={(values) =>
                handleAddAddress(values, setActive, setAddAddress)
            }
        >
            {({
                handleSubmit,
                handleChange,
                setFieldValue,
                errors,
                values,
            }) => (
                <>
                    <FormControl style={{ width: "100%" }}>
                        <TextField
                            variant="outlined"
                            name="firstName"
                            onChange={handleChange}
                            error={!!errors.firstName}
                            label="First Name"
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
                    <FormControl variant="outlined" style={{ width: "100%" }}>
                        <InputLabel>Country</InputLabel>
                        <Select
                            label="Country"
                            name="country"
                            onChange={handleChange}
                            variant="outlined"
                            error={!!errors.country}
                        >
                            {countries.map((country) => (
                                <MenuItem value={country}>
                                    {country.text}
                                </MenuItem>
                            ))}
                        </Select>
                        <ErrorMessage>
                            {errors.country && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;Please select country.
                                </>
                            )}
                        </ErrorMessage>
                    </FormControl>
                    <FormControl style={{ width: "100%" }}>
                        <TextField
                            variant="outlined"
                            name="address"
                            onChange={handleChange}
                            error={!!errors.address}
                            label="Address"
                        />
                        <ErrorMessage>
                            {errors.address && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;Please enter street address.
                                </>
                            )}
                        </ErrorMessage>
                    </FormControl>
                    <FormControl style={{ width: "100%" }}>
                        <TextField
                            variant="outlined"
                            name="city"
                            onChange={handleChange}
                            error={!!errors.city}
                            label="City"
                        />
                        <ErrorMessage>
                            {errors.city && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;Please enter city.
                                </>
                            )}
                        </ErrorMessage>
                    </FormControl>
                    <FormControl style={{ width: "100%" }}>
                        <TextField
                            variant="outlined"
                            name="state"
                            onChange={handleChange}
                            error={!!errors.state}
                            label="State, Province or Region"
                        />
                        <ErrorMessage>
                            {errors.state && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;Please enter state, province or
                                    region.
                                </>
                            )}
                        </ErrorMessage>
                    </FormControl>
                    <FormControl style={{ width: "100%" }}>
                        <TextField
                            variant="outlined"
                            name="postalCode"
                            onChange={handleChange}
                            error={!!errors.postalCode}
                            label="Postal Code"
                        />
                        <ErrorMessage>
                            {errors.postalCode && (
                                <>
                                    <ErrorIcon fontSize="small" />
                                    &nbsp;&nbsp;Please enter postal code.
                                </>
                            )}
                        </ErrorMessage>
                    </FormControl>
                    <PhoneInput
                        placeholder="Enter you mobile number"
                        country={values["country"].value.toLowerCase()}
                        disableDropdown
                        name="mobileNumber"
                        onChange={(phone) =>
                            setFieldValue("mobileNumber", phone)
                        }
                    />
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
export default ShippingAddressForm;
