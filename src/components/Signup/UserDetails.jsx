import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import {
    OutlinedInput,
    Select,
    MenuItem,
    FormControl,
    Button,
} from "@material-ui/core";
import { Error } from "@material-ui/icons";
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

const UserInformationForm = ({ updateDetails }) => (
    <>
        <Formik
            validateOnMount={false}
            validationSchema={Yup.object().shape({
                lastName: Yup.string().required("Required"),
                firstName: Yup.string().required("Required"),
                country: Yup.string().required("Required"),
            })}
            initialValues={{ firstName: "", lastName: "", country: "" }}
            onSubmit={(values) => updateDetails(values)}
        >
            {({ handleSubmit, handleChange, errors, touched }) => (
                <>
                    <Text fontSize={16} margin="0px 0px 8px">
                        First name
                    </Text>
                    <OutlinedInput
                        placeholder="First Name"
                        variant="outlined"
                        name="firstName"
                        onChange={handleChange}
                        error={!!errors.firstName}
                    />
                    <ErrorMessage>
                        {errors.firstName && (
                            <>
                                <ErrorIcon fontSize="small" />
                                &nbsp;&nbsp;{errors.firstName}
                            </>
                        )}
                    </ErrorMessage>
                    <Text fontSize={16} margin="0px 0px 8px">
                        Last name
                    </Text>
                    <OutlinedInput
                        placeholder="Last Name"
                        variant="outlined"
                        name="lastName"
                        onChange={handleChange}
                        error={!!errors.lastName}
                    />
                    <ErrorMessage>
                        {errors.lastName && (
                            <>
                                <ErrorIcon fontSize="small" />
                                &nbsp;&nbsp;{errors.lastName}
                            </>
                        )}
                    </ErrorMessage>
                    <Text fontSize={16} margin="0px 0px 8px">
                        Country or Region
                    </Text>
                    <FormControl style={{ width: "100%" }}>
                        <Select
                            name="country"
                            onChange={handleChange}
                            variant="outlined"
                            error={!!errors.country}
                        >
                            <MenuItem value="South Korea">South Korea</MenuItem>
                            <MenuItem value="Other than South Korea">
                                Other than South Korea
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <ErrorMessage>
                        {errors.country && (
                            <>
                                <ErrorIcon fontSize="small" />
                                &nbsp;&nbsp;{errors.country}
                            </>
                        )}
                    </ErrorMessage>
                    <ButtonWrapper
                        margin="8px 0px 0px"
                        onClick={handleSubmit}
                        disabled={
                            !!(
                                errors.firstName ||
                                errors.lastName ||
                                errors.country
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

export default UserInformationForm;
