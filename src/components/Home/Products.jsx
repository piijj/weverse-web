import React, { useEffect, useState } from "react";
import {
    CardActionArea,
    CardContent,
    Grid,
    Tab,
    Tabs,
} from "@material-ui/core";
import styled from "styled-components";
import { useDataState } from "../../context/DataContext";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: Noto Sans KR, sans-serif;
    font-weight: ${(props) => props.fontWeight || "normal"};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin || "5px 0px"};
`;

const Category = styled(Tab)`
    min-width: auto !important;
`;

const Image = styled.img`
    width: 256px;
    height: 307px;
    border-radius: 5px;
    object-fit: cover;
`;

const Card = styled(CardActionArea)`
    width: 256px;
`;

const Members = styled.div`
    display: flex;
    align-items: center;
`;

const Badges = styled.div`
    display: flex;
    align-items: center;
`;

const Circle = styled.span`
    color: #878e96;
    margin: 0px 5px;
    background: #878e96;
    width: 4px;
    height: 4px;
    border-radius: 50%;
`;

const List = styled(Grid)`
    flex-wrap: wrap;
    margin: 30px 0px;
`;

const Products = () => {
    const { products } = useDataState();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");

    useEffect(() => {
        setCategories([
            ...new Set(products.map((product) => product.category)),
        ]);
    }, [products]);

    useEffect(() => {
        setCategory(categories[0]);
    }, [categories]);

    return (
        <>
            <Text fontSize={20} fontWeight="bold">
                Shop
            </Text>
            <Tabs
                value={category}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, value) => setCategory(value)}
            >
                {categories.map((c) => (
                    <Category key={c} label={c.toUpperCase()} value={c} />
                ))}
            </Tabs>
            <List container spacing={3}>
                {products
                    .filter((p) => p.category === category)
                    .map((product) => (
                        <Grid key={product.id} item>
                            <Card>
                                <Image src={product.displayPic} />
                                <CardContent>
                                    <Badges>
                                        {product.isMembersOnly && (
                                            <Members>
                                                <img src="/images/weverse-membership.svg" />
                                                <Text
                                                    fontSize={10}
                                                    color="#9557F7"
                                                    fontWeight="bold"
                                                >
                                                    {" "}
                                                    ONLY
                                                </Text>
                                            </Members>
                                        )}
                                        {product.isExclusive && (
                                            <>
                                                {product.isMembersOnly && (
                                                    <Circle />
                                                )}
                                                <Text
                                                    fontSize={10}
                                                    color="#0BE6C1"
                                                    fontWeight="bold"
                                                >
                                                    EXCLUSIVE
                                                </Text>{" "}
                                                {product.isPreorder && (
                                                    <Circle />
                                                )}
                                            </>
                                        )}
                                        {product.isPreorder && (
                                            <Text
                                                fontSize={10}
                                                color="#878E96"
                                                fontWeight="bold"
                                            >
                                                PRE-ORDER
                                            </Text>
                                        )}
                                    </Badges>
                                    <Text fontSize={14}>{product.name}</Text>
                                    <Text fontSize={14} fontWeight="bold">
                                        {product.price.toLocaleString()}
                                    </Text>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </List>
        </>
    );
};

export default Products;
