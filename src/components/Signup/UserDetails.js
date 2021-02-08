import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import {
    OutlinedInput,
    Select,
    MenuItem,
    FormControl,
} from "@material-ui/core";
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

const SelectInput = styled(Select)`
    &.MuiOutlinedInput-root {
        height: 47px;
    }
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
                    <Field
                        placeholder="First Name"
                        variant="outlined"
                        name="firstName"
                        onChange={handleChange}
                        inputProps={{ style: { height: "10px" } }}
                    />
                    <ErrorMessage>
                        {errors.firstName && touched.firstName && (
                            <>
                                <ErrorIcon fontSize="small" />
                                &nbsp;&nbsp;{errors.firstName}
                            </>
                        )}
                    </ErrorMessage>
                    <Text fontSize={16} margin="0px 0px 8px">
                        Last name
                    </Text>
                    <Field
                        placeholder="Last Name"
                        variant="outlined"
                        name="lastName"
                        onChange={handleChange}
                        inputProps={{ style: { height: "10px" } }}
                    />
                    <ErrorMessage>
                        {errors.lastName && touched.lastName && (
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
                        <SelectInput
                            name="country"
                            onChange={handleChange}
                            variant="outlined"
                        >
                            <MenuItem value="South Korea">South Korea</MenuItem>
                            <MenuItem value="Other than South Korea">
                                Other than South Korea
                            </MenuItem>
                        </SelectInput>
                    </FormControl>
                    <ErrorMessage>
                        {errors.country && touched.country && (
                            <>
                                <ErrorIcon fontSize="small" />
                                &nbsp;&nbsp;{errors.country}
                            </>
                        )}
                    </ErrorMessage>
                    <Button margin="8px 0px 0px" onClick={handleSubmit}>
                        Next
                    </Button>
                </>
            )}
        </Formik>
    </>
);

export default UserInformationForm;
