import React from "react";
import {
    Button,
    FormControlLabel,
    OutlinedInput,
    Checkbox,
    FormGroup,
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import styled from "styled-components";
import { useDataDispatch, useDataState } from "../context/DataContext";
import Layout from "../components/shared/Layout";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: ${(props) => props.fontFamily};
    font-weight: ${(props) => props.fontWeight};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin};
    letter-spacing: ${(props) => props.letterSpacing};
`;

const ButtonWrapper = styled(Button)`
    margin: "26px 0px 0px";
`;

const CheckCircleIcon = styled(CheckCircle)`
    ${({ theme }) => `
            color: ${theme.palette.primary.main};
    transform: scale(1.1);
            `}
`;

const UncheckedCircleIcon = styled(CheckCircle)`
    color: rgb(235, 235, 235);
    transform: scale(1.1);
`;

const FormLabel = styled(FormControlLabel)`
    padding: 8px 8px;
`;

const AddProduct = () => {
    const { artists, shops } = useDataState();
    const { handleAddProduct } = useDataDispatch();

    const handleUpdateArtistAndShop = (prop, value, values, setFieldValue) => {
        const checked = values[prop].findIndex((data) => data === value);
        const updatedValues =
            checked >= 0
                ? values[prop].filter((data) => data !== value)
                : [...values[prop], value];
        setFieldValue(prop, updatedValues);
    };

    return (
        <Layout>
            <Text fontSize={24}>Add Product</Text>
            <Formik
                validateOnMount={false}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required("Required"),
                    price: Yup.number().required("Required"),
                    artistIds: Yup.array().required("Required"),
                    shopsAvailableIn: Yup.array().required("Required"),
                    displayPic: Yup.string().required("Required"),
                    description: Yup.string().required("Required"),
                    category: Yup.string().required("Required"),
                    maxQtyPerOrder: Yup.number().required("Required"),
                    stock: Yup.number().required("Required"),
                    shippingDate: Yup.date(),
                    preorderStartDate: Yup.date(),
                    preorderEndDate: Yup.date(),
                    isExclusive: Yup.boolean().required("Required"),
                    isPreorder: Yup.boolean().required("Required"),
                    isMembersOnly: Yup.boolean().required("Required"),
                    isFeatured: Yup.boolean().required("Required"),
                })}
                initialValues={{
                    name: "",
                    price: 0,
                    artistIds: [],
                    shopsAvailableIn: [],
                    displayPic: "",
                    description: "",
                    category: "",
                    maxQtyPerOrder: 0,
                    stock: 0,
                    shippingDate: "",
                    preorderStartDate: "",
                    preorderEndDate: "",
                    isExclusive: false,
                    isPreorder: false,
                    isMembersOnly: false,
                    isFeatured: false,
                    header: {
                        title: "",
                        description: "",
                        pic: "",
                    },
                }}
                onSubmit={(values) => {
                    handleAddProduct(values);
                }}
            >
                {({ handleSubmit, handleChange, setFieldValue, values }) => (
                    <>
                        <FormGroup row>
                            <Text fontSize={16}>Artist</Text>
                            {artists.map((a) => (
                                <FormLabel
                                    control={
                                        <Checkbox
                                            icon={<UncheckedCircleIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                            value={a}
                                            onChange={() =>
                                                handleUpdateArtistAndShop(
                                                    "artistIds",
                                                    a,
                                                    values,
                                                    setFieldValue
                                                )
                                            }
                                        />
                                    }
                                    label={<Text>{a.name}</Text>}
                                />
                            ))}
                        </FormGroup>
                        {values.artistIds.length > 0 && (
                            <FormGroup row>
                                <Text fontSize={16}>Shops Available</Text>

                                {[
                                    ...new Set(
                                        values.artistIds
                                            .map((artist) => artist.shopIds)
                                            .flat()
                                    ),
                                ].map((s) => (
                                    <FormLabel
                                        control={
                                            <Checkbox
                                                value={s}
                                                icon={<UncheckedCircleIcon />}
                                                checkedIcon={
                                                    <CheckCircleIcon />
                                                }
                                                onChange={() =>
                                                    handleUpdateArtistAndShop(
                                                        "shopsAvailableIn",
                                                        s,
                                                        values,
                                                        setFieldValue
                                                    )
                                                }
                                            />
                                        }
                                        label={
                                            <Text>
                                                {shops[s].name.toUpperCase()}
                                            </Text>
                                        }
                                    />
                                ))}
                            </FormGroup>
                        )}
                        <OutlinedInput
                            placeholder="Product Name"
                            variant="outlined"
                            name="name"
                            onChange={handleChange}
                        />
                        <OutlinedInput
                            placeholder="Display Pic"
                            variant="outlined"
                            name="displayPic"
                            onChange={handleChange}
                        />
                        <OutlinedInput
                            placeholder="Description"
                            variant="outlined"
                            name="description"
                            onChange={handleChange}
                        />
                        <OutlinedInput
                            placeholder="Price"
                            variant="outlined"
                            name="price"
                            type="number"
                            onChange={handleChange}
                        />
                        <OutlinedInput
                            placeholder="Category"
                            variant="outlined"
                            name="category"
                            onChange={handleChange}
                        />
                        <OutlinedInput
                            placeholder="Maximum quantity per order"
                            variant="outlined"
                            name="maxQtyPerOrder"
                            type="number"
                            onChange={handleChange}
                        />
                        <OutlinedInput
                            placeholder="Stock"
                            variant="outlined"
                            name="stock"
                            type="number"
                            onChange={handleChange}
                        />
                        <OutlinedInput
                            placeholder="Shipping Date"
                            variant="outlined"
                            name="shippingDate"
                            onChange={handleChange}
                            type="datetime-local"
                            defaultValue={moment().format("YYYY-MM-DTHH:mm")}
                        />
                        {values.isPreorder && (
                            <>
                                <OutlinedInput
                                    placeholder="Pre-order Start Date"
                                    variant="outlined"
                                    name="preorderStartDate"
                                    onChange={handleChange}
                                    type="datetime-local"
                                    defaultValue={moment().format(
                                        "YYYY-MM-DTHH:mm"
                                    )}
                                />
                                <OutlinedInput
                                    placeholder="Pre-order Start Date"
                                    variant="outlined"
                                    name="preorderEndDate"
                                    onChange={handleChange}
                                    type="datetime-local"
                                    defaultValue={moment().format(
                                        "YYYY-MM-DTHH:mm"
                                    )}
                                />
                            </>
                        )}
                        {values.isFeatured && (
                            <>
                                <OutlinedInput
                                    placeholder="Header Photo"
                                    variant="outlined"
                                    name="header.pic"
                                    onChange={handleChange}
                                />
                                <OutlinedInput
                                    placeholder="Header Title"
                                    variant="outlined"
                                    name="header.title"
                                    onChange={handleChange}
                                />

                                <OutlinedInput
                                    placeholder="Header Description"
                                    variant="outlined"
                                    name="header.description"
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <FormLabel
                            control={
                                <Checkbox
                                    icon={<UncheckedCircleIcon />}
                                    checkedIcon={<CheckCircleIcon />}
                                    name="isFeatured"
                                    onChange={handleChange}
                                />
                            }
                            label={<Text>Is Featured</Text>}
                        />
                        <FormLabel
                            control={
                                <Checkbox
                                    icon={<UncheckedCircleIcon />}
                                    checkedIcon={<CheckCircleIcon />}
                                    name="isExclusive"
                                    onChange={handleChange}
                                />
                            }
                            label={<Text>Is Exclusive</Text>}
                        />
                        <FormLabel
                            control={
                                <Checkbox
                                    icon={<UncheckedCircleIcon />}
                                    checkedIcon={<CheckCircleIcon />}
                                    name="isMembersOnly"
                                    onChange={handleChange}
                                />
                            }
                            label={<Text>Is For Members Only</Text>}
                        />
                        <FormLabel
                            control={
                                <Checkbox
                                    icon={<UncheckedCircleIcon />}
                                    checkedIcon={<CheckCircleIcon />}
                                    name="isPreorder"
                                    onChange={handleChange}
                                />
                            }
                            label={<Text>Is Pre-Order</Text>}
                        />
                        <ButtonWrapper onClick={handleSubmit}>
                            Add Product
                        </ButtonWrapper>
                    </>
                )}
            </Formik>
        </Layout>
    );
};

export default AddProduct;
