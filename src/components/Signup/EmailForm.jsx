import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { OutlinedInput, Button } from "@material-ui/core";
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

const EmailForm = ({ updateDetails }) => (
    <>
        <Text fontSize={16} margin="0px 0px 8px">
            Email
        </Text>
        <Text color="rgb(135, 142, 150)" margin="0px 0px 8px">
            We'll send you a verification email to verify your email. Please
            enter an email that you use most often.
        </Text>
        <Formik
            validateOnMount={false}
            validationSchema={Yup.object().shape({
                email: Yup.string().email().required("Required"),
            })}
            initialValues={{ email: "" }}
            onSubmit={(values) => updateDetails({ email: values.email })}
        >
            {({ handleSubmit, handleChange, errors }) => (
                <>
                    <OutlinedInput
                        placeholder="Email for your Weverse Account"
                        variant="outlined"
                        name="email"
                        onChange={handleChange}
                        error={!!errors.email}
                    />
                    <ErrorMessage>
                        {errors.email && (
                            <>
                                <ErrorIcon fontSize="small" />
                                &nbsp;&nbsp;Please enter valid Email.
                            </>
                        )}
                    </ErrorMessage>
                    <ButtonWrapper
                        margin="8px 0px 0px"
                        onClick={handleSubmit}
                        disabled={!!errors.email}
                    >
                        Next
                    </ButtonWrapper>
                </>
            )}
        </Formik>
    </>
);

export default EmailForm;
